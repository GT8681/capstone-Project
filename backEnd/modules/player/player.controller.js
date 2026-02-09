import { getAllPlayers, updatePlayer, deletePlayer, findRolePlayer } from "./player.service.js";
import Player from '../player/player.schema.js';



export const getPlayers = async (req, res) => {
    try {

        const players = await getAllPlayers();
        res.json(players);


    } catch (error) {
        res.status(500)
            .json({
                status: 500,
                message: error.message
            })
    }

}


export const createPlayers = async (req, res) => {

    try {
        const { name, surname, age } = req.body;

        const duplicatePlayer = await Player.findOne({ name, surname, age });
        if (duplicatePlayer) {
            return res.status(400).json({
                message: 'Questo giocatore e gia presente nel database'
            })
        }

        const playerData = req.body;
        if (req.file) {
            playerData.avatar = req.file.path;
        }
        const newPlayer = new Player(playerData);
        await newPlayer.save();

        res.status(201)
            .json(newPlayer)

    } catch (error) {
        res.status(400)
            .json({
                message: error.message
            })
    }
}

export const patchPlayer = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const newPlayer = await updatePlayer(id, body);

        res.status(200).json({
            statusCode: 200,
            player: newPlayer,
            message: 'Player update successfully'
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }

}

export const deleteOnePlayer = async (req, res) => {

    try {

        const { id } = req.params;
        await deletePlayer(id)

        res.status(200).json({
            statusCode: 200,
            message: 'Player deleted successfully'
        })
    } catch (error) {

        res.status(500).json({
            message: error.message
        })

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

