const usersRepository = require('./users-repository');
const User = require('../modelsUser');
async function getUserByEmail(email){
  try{
    //cari user
    const user = await User.findOne({email});
    return user;
  }catch (error){
    throw error;
  }
}
async function getUsersPaginated(offset, limit) {
  try {
    const users = await User.find()
      .skip(offset)
      .limit(limit)
      .select('-password'); // Hindari mengembalikan password
    return users;
  } catch (error) {
    throw error;
  }
}
async function countUsers() {
  try {
    return await User.countDocuments();
  } catch (error) {
    throw error;
  }
}
async function getUsers() {
  return usersRepository.getUsers();
}

async function getUser(id) {
  return usersRepository.getUser(id);
}

async function emailExists(email) {
  const user = await usersRepository.getUserByEmail(email);
  return !!user; // Return true if user exists, false otherwise
}

async function createUser(email, password, fullName) {
  return usersRepository.createUser(email, password, fullName);
}

async function updateUser(id, email, fullName) {
  return usersRepository.updateUser(id, email, fullName);
}

async function deleteUser(id) {
  return usersRepository.deleteUser(id);
}

module.exports = {
  getUsers,
  getUser,
  emailExists,
  createUser,
  updateUser,
  deleteUser,
};
