const PetsData = require("../models/PetsSchema");

async function getAllPetsFromDB() {
  try {
    return PetsData.find({});
  } catch (err) {
    return err;
  }
}

async function findPetToDeleteFromDB(petToDelete) {
  try {
    PetsData.deleteMany({ _id: petToDelete });
  } catch (err) {
    return err;
  }
}

async function returnPetStatusToAvailable(petToRemove) {
  try {
    PetsData.findOne({ _id: petToRemove }, (err, result) => {
      if (err) {
        return err;
      }
      return result;
    }).updateMany(
      { _id: petToRemove },
      { $set: { adoptionStatus: "Available", owner: "" } }
    );
  } catch (err) {
    return err;
  }
}

async function addNewPetToDatabase(
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
) {
  try {
    const newPet = PetsData({
      type: type,
      name: name,
      adoptionStatus: adoptionStatus,
      height: height,
      weight: weight,
      color: color,
      picture: picture,
      bio: bio,
      hypoallergenic: hypoallergenic,
      dietery: dietaryRest,
      breed: breed,
    });
    await newPet.save();
    return newPet;
  } catch (err) {
    return err;
  }
}

async function changePetStatusInDB(petId, userId, status) {
  try {
    PetsData.findOne({ _id: petId }, (err, result) => {
      if (err) {
        return err;
      }
      return result;
    }).updateMany(
      { _id: petId },
      { $set: { adoptionStatus: status, owner: userId } }
    );
  } catch (err) {
    return err;
  }
}

async function editPetDataInDB(
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
  petId
) {
  try {
    PetsData.findByIdAndUpdate(
      { _id: petId },
      {
        type: type,
        name: name,
        adoptionStatus: adoptionStatus,
        picture: picture.picture,
        height: height,
        weight: weight,
        color: color,
        bio: bio,
        hypoallergenic: hypoallergenic,
        dietery: dietery,
        breed: breed,
      },
      { new: true },
      (err, result) => {
        if (err) {
          return err;
        }
        return result;
      }
    );
  } catch (err) {
    return err;
  }
}

async function calculatePetFindConditioned(petsSearchQuery) {
  const petFindConditions = [];
  if (petsSearchQuery.type) {
    const petFindConditionType = { type: petsSearchQuery.type };
    petFindConditions.push(petFindConditionType);
  }
  if (petsSearchQuery.name) {
    const petFindConditionName = {
      name: {
        $eq:
          petsSearchQuery.name.charAt(0).toUpperCase() +
          petsSearchQuery.name.slice(1),
      },
    };
    petFindConditions.push(petFindConditionName);
  }
  if (petsSearchQuery.adoptionStatus) {
    const petFindConditionAdoption = {
      adoptionStatus: petsSearchQuery.adoptionStatus,
    };
    petFindConditions.push(petFindConditionAdoption);
  }
  if (petsSearchQuery.height && petsSearchQuery.minheight) {
    const petFindConditionHeight = {
      height: {
        $lte: petsSearchQuery.height,
        $gte: petsSearchQuery.minheight,
      },
    };
    petFindConditions.push(petFindConditionHeight);
  } else if (petsSearchQuery.height && !petsSearchQuery.minheight) {
    const petFindConditionHeight = {
      height: { $lte: petsSearchQuery.height },
    };
    petFindConditions.push(petFindConditionHeight);
  }
  if (petsSearchQuery.weight && petsSearchQuery.minweight) {
    const petFindConditionWeight = {
      weight: {
        $lte: petsSearchQuery.weight,
        $gte: petsSearchQuery.minweight,
      },
    };
    petFindConditions.push(petFindConditionWeight);
  } else if (petsSearchQuery.weight && !petsSearchQuery.minweight) {
    const petFindConditionWeight = {
      weight: { $lte: petsSearchQuery.weight },
    };
    petFindConditions.push(petFindConditionWeight);
  }
  return petFindConditions;
}

async function searchPetInDB(petsSearchQuery) {
  try {
    const petFindConditions = await calculatePetFindConditioned(petsSearchQuery);
    return PetsData.find({
      $and: petFindConditions,
    });
  } catch (err) {
    return err;
  }
}

module.exports = {
  getAllPetsFromDB,
  findPetToDeleteFromDB,
  returnPetStatusToAvailable,
  addNewPetToDatabase,
  changePetStatusInDB,
  editPetDataInDB,
  searchPetInDB,
};
