import { updatePlayer, findRolePlayer, findPlayerById, findNationalityPlayer } from "./player.service.js";
import Player from './player.schema.js';


/*
export const getPlayers = async (req, res) => {
    try {

        const players = await Player.find().populate('author','name surname email');

        res.json(players);
    } catch (error) {
        res.status(500)
            .json({     
                status: 500,
                message: error.message
            })
    }
}
*/


export const getPlayers = async (req, res) => {
    try {

        const { role, search, age, nationality, rating, foot } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { surname: { $regex: search, $options: 'i' } }
            ];
        }

        if (role) {
            const activeRoles = role;
            const rolesArray = Array.isArray(activeRoles) ? activeRoles : activeRoles.split(',');
            query.role = { $in: rolesArray };
        }
        if (foot) {
            query.foot = foot;
        }

        if (nationality) {
            query.nationality = { $regex: nationality, $options: 'i' };
        }

        if (age && age !== "") {

            query.age = Number(age);
        }

        if (rating && rating !== "") {

            query.rating = Number(rating);

        }


        const players = await Player.find(query).populate('author', 'name surname email');
        res.json(players);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMyPlayers = async (req, res) => {
    try {
        const players = await Player.find({ author: req.user.id })
        res.json(players);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const createPlayers = async (req, res) => {

    try {
        const { name, surname } = req.body;

        // CONTROLLO GLOBALE: Cerchiamo se esiste già nel DB (per TUTTI gli autori)
        const duplicatePlayer = await Player.findOne({
            name: { $regex: new RegExp(`^${name}$`, "i") },
            surname: { $regex: new RegExp(`^${surname}$`, "i") }
        });

        if (duplicatePlayer) {
            return res.status(400).json({

                message: 'Questo talento è già stato inserito da un altro Partner ed è presente nella Home!'
            });
        }

        const playerData = { ...req.body, author: req.user.id };
        if (req.file) playerData.avatar = req.file.path;

        const newPlayer = new Player(playerData);
        await newPlayer.save();

        res.status(201).json(newPlayer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

export const patchPlayer = async (req, res) => {
    try {
        const { id } = req.params;
        // findByIdAndUpdate con req.body aggiorna solo i campi inviati
        const updatedPlayer = await Player.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        console.log('updatePlayer', updatePlayer);
        if (!updatedPlayer) return res.status(404).json({ message: "Player non trovato" });

        res.status(200).json(updatedPlayer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteOnePlayer = async (req, res) => {

    try {
        const { id } = req.params;

        // Troviamo il giocatore
        const player = await Player.findById(id);

        if (!player) {
            return res.status(404).json({ message: "Giocatore non trovato" });
        }
        // Verifichiamo se l'ID dell'utente nel token corrisponde all'author del player
        if (player.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Non sei autorizzato a cancellare questo giocatore. Non l'hai creato tu!"
            });
        }
        await Player.findByIdAndDelete(id);

        res.json({ message: "Giocatore eliminato con successo dalla tua Dashboard" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const findPlayerRole = async (req, res) => {
    try {
        const { role } = req.query;
        const player = await findRolePlayer(role)
        res.json(player);

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}

export const playerById = async (req, res) => {
    try {
        const { id } = req.params;
        const player = await Player.findById(id).populate('author', 'name surname email');
        if (!player) {
            return res.status(404).json({
                message: 'Player not found'
            })
        }
        res.status(200).json(player)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}

export const getPlayersNationality = async (req, res) => {

    try {
        const { nationality } = req.params;
        const players = await findNationalityPlayer({
            Nationality: { $regex: nationality, $options: "i" }

        });
        res.status(200).json({ players });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
