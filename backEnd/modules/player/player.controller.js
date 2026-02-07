import { getAllPlayers,createPlayer,updatePlayer,deletePlayer,findRolePlayer} from "./player.service.js";



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
    const {body} = req;
    try {
        const player = await createPlayer(body);
        console.log(player);
        res.status(201)
            .json({
                statusCode : 201,
                player,
                message : 'Player created successfully'
            })

    } catch (error) {
        res.status(400)
            .json({
                message: error.message
            })
    }
}

export const patchPlayer = async (req,res) => {
     try {
        const {id} = req.params;
        const body = req.body;
        const newPlayer = await updatePlayer(id,body);

             res.status(200).json({
                statusCode : 200,
                player : newPlayer,
                message : 'Player update successfully'
             })
        
     } catch (error) {
        res.status(500).json({
            message : error.message
        })
        
     }

}

export const deleteOnePlayer = async (req,res) =>{

    try {
        
        const {id} = req.params;
        await deletePlayer(id)

        res.status(200).json({
            statusCode : 200,
            message : 'Player deleted successfully'
        })
    } catch (error) {

        res.status(500).json({
            message : error.message
        })
        
    }

}

export const findPlayerRole = async (req,res) => {
    try {
        const {role} = req.query;
        const player = await findRolePlayer(role)
        res.json(player);
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

