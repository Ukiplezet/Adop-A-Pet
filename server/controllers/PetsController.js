const {
  findPetToDeleteFromDB,
  returnPetStatusToAvailable,
  addNewPetToDatabase,
  changePetStatusInDB,
  editPetDataInDB,
  getAllPetsFromDB,
  searchPetInDB,
} = require("../data/Pets");

const {
  removeSavedPetFromUserArray,
  changeStatusOfPetInSavedArray,
  savePetAtUserArray,
  getUserFromDBById,
} = require("../data/Users");

async function getAllPetsController(req, res) {
  try {
    const response = await getAllPetsFromDB();
    return res.status(200).send(response);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function savePetToUser(req, res) {
  try {
    const userId = req.body.userId;
    const petToAdd = req.body.petData;
    const response = await savePetAtUserArray(userId, petToAdd);
    return res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function getPetByTheUserId(req, res) {
  const userId = req.params.id;
  try {
    const response = await getUserFromDBById(userId);
    return res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function deleteSavedPetFromArrayController(req, res) {
  const userId = req.body.userId;
  const petToRemove = req.body.pet._id;
  try {
    const response = await removeSavedPetFromUserArray(userId, petToRemove);
    return res.status(200).send(response);
  } catch (e) {
    res.status(400).send(e);
  }
}

async function deletePetFromDB(req, res) {
  const petToDelete = req.body.petId;
  const role = req.body.role;
  try {
    if (role === "admin") {
      await findPetToDeleteFromDB(petToDelete);
      res.status(200).send("Deleted successfully");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function returnSavedPetController(req, res) {
  const userId = req.body.userId;
  const petToRemove = req.params.id;
  const petOwner = req.body.pet.owner;
  if (userId === petOwner) {
    try {
      await removeSavedPetFromUserArray(userId, petToRemove).then(async () => {
        await returnPetStatusToAvailable(petToRemove);
      });
      return res.status(200).send("Pet removed successfully ");
    } catch (e) {
      res.status(400).send(e);
    }
  } else {
    return res.status(500).send("This is not your pet");
  }
}

async function addNewPetToDBController(req, res) {
  const {
    type,
    name,
    adoptionStatus,
    picture,
    height,
    weight,
    color,
    bio,
    hypoallergenic,
    dietaryRest,
    breed,
  } = req.body.petData;
  try {
    const newPet = await addNewPetToDatabase(
      type,
      name,
      adoptionStatus,
      picture,
      height,
      weight,
      color,
      bio,
      hypoallergenic,
      dietaryRest,
      breed
    );
    res.status(201).send(newPet);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function adoptOrFosterPetController(req, res) {
  const { status, pet, userId } = req.body;
  const petId = req.params.id;
  try {
    const petResponse = await changePetStatusInDB(petId, userId, status).then(
      async () => {
        await changeStatusOfPetInSavedArray(userId, pet, petId, status);
      }
    );
    return  res.status(200).send(petResponse);
  } catch (e) {
    res.status(500).send(e);
  }
 
}

async function editPetDataController(req, res) {
  const {
    type,
    name,
    adoptionStatus,
    picture,
    height,
    weight,
    color,
    bio,
    hypoallergenic,
    dietery,
    breed,
  } = req.body.petData;
  const petId = req.params.id;
  const role = req.body.admin;
  try {
    if (role === "admin") {
      const response = await editPetDataInDB(
        type,
        name,
        adoptionStatus,
        picture,
        height,
        weight,
        color,
        bio,
        hypoallergenic,
        dietery,
        breed,
        petId,
        role
      );
      return res.status(200).send(response);
    } else {
      res.status(401).send("Access denied, Unauthorized user ");
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

async function getPetBySearchCriteria(req, res) {
  const petsSearchQuery = req.query;
  try {
    const response = await searchPetInDB(petsSearchQuery);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  getAllPetsController,
  savePetToUser,
  getPetByTheUserId,
  deleteSavedPetFromArrayController,
  deletePetFromDB,
  returnSavedPetController,
  addNewPetToDBController,
  adoptOrFosterPetController,
  editPetDataController,
  getPetBySearchCriteria,
};
