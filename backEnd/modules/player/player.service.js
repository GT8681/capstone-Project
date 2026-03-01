import Player from './player.schema.js'

export const getAllPlayers = async () => {
    return await Player.find();
}

export const createPlayer = async (data) => {
    const player = new Player(data);
    return await player.save();
}
export const updatePlayer = async (id,data) =>{

    return await Player.findByIdAndUpdate(id,data,{new : true});

}
export const deletePlayer = async (id) =>{

    return await Player.findByIdAndDelete(id)

}
export const findRolePlayer = async (role) => {

    const query = role ? {role : role} : {};
    return await Player.find(query);
}
export const findPlayerById = async (id) => {
    return await Player.findById(id);
}

export const findNationalityPlayer = async (id) => {

    const query = id ? {id : id} : {};
    return await Player.find(query);
}

