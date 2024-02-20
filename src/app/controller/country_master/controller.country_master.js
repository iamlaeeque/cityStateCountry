// countryController.js

const { where } = require("sequelize");
const Model = require("../../models");

// const getAllCountries = async (req, res) => {
//   try {
//     // Retrieve all countries from the database
//     const countries = await Model.country_masters.findAll();

//     const newArray = countries.map((item) => {
//       const { country_name } = item;
//       return { country_name };
//     });

//     console.log(newArray);

//     // Send the list of countries as the response
//     res.status(200).json(newArray);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const createCountry = async (req, res) => {
//   try {
//     const { country_name } = req.body;

//     console.log(req.body);

//     // Validate the request data
//     if (!country_name) {
//       return res.status(400).json({ error: "Name is required" });
//     }

//     // Create a new country in the database
//     const newCountry = await Model.country_masters.create({
//       country_name,
//     });

//     // Send the newly created country as the response
//     res.status(201).json(newCountry);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const createState = async (req, res) => {
//   try {
//     const { country_name, state_name } = req.body;

//     console.log(req.body);

//     // Validate the request data
//     if (!country_name || !state_name) {
//       return res
//         .status(400)
//         .json({ error: "country_masters_name or state_name are required" });
//     }

//     const allCountries = await Model.country_masters.findAll();

//     //find country id based on country name
//     const country = allCountries.find(
//       (country) => country.country_name == country_name
//     );
//     if (!country.id) {
//       res.status(500).json({ error: "Internal Server Error" });
//     }

//     // Create a new state in the database
//     const newState = await Model.state_masters.create({
//       country_masters_id: country.id,
//       state_name,
//     });

//     res.status(201).json(newState);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const getAllStates = async (req, res) => {
//   try {
//     // Retrieve all states with associated country names
//     const states = await Model.state_masters.findAll({
//       include: [
//         {
//           model: Model.country_masters,
//           as: "country",
//         },
//       ],
//     });

//     // Transform the result to the desired format
//     const formattedStates = states.map((state) => ({
//       country_name: state.country.country_name,
//       country_id: state.country.id,
//       state_name: state.state_name,
//       state_id: state.id,
//     }));

//     res.status(200).json(formattedStates);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const getModelData = async (req, res) => {
  try {
    const { modelName } = req.body;

    console.log("Get Model Data : ", req.body);

    if (!modelName) {
      return res
        .status(400)
        .json({ error: "Model name is required in the request body!" });
    }

    if (!Model[modelName]) {
      return res.status(404).json({ error: `Model '${modelName}' not found` });
    }

    const modelData = await Model[modelName].findAll();

    res.status(200).json(modelData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const setModelData = async (req, res) => {
//   try {
//     const { modelName, payload, id } = req.body;

//     console.log("Set Model Data : ", req.body);

//     // Validate the request data
//     if (!modelName || !payload) {
//       return res.status(400).json({
//         error: "Model name and payload are required in the request body",
//       });
//     }

//     // Check if the model exists
//     if (!Model[modelName]) {
//       return res.status(404).json({ error: `Model '${modelName}' not found` });
//     }

//     if (id) {
//       const updateRecord = await Model[modelName].update(payload, {
//         where: {
//           id,
//         },
//       });
//       res.status(201).json("Record Updated Successfully! ");
//     } else {
//       // Insert data
//       const newRecord = await Model[modelName].create(payload);
//       res.status(201).json(newRecord);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const setModelData = async (req, res) => {
//   try {
//     const { modelName, payload, id, include } = req.body;

//     console.log("Set Model Data : ", req.body);

//     // Validate the request data
//     if (!modelName || !payload) {
//       return res.status(400).json({
//         error: "Model name and payload are required in the request body",
//       });
//     }

//     // Check if the model exists
//     if (!Model[modelName]) {
//       return res.status(404).json({ error: `Model '${modelName}' not found` });
//     }

//     // Create or update data
//     let record;
//     if (id) {
//       const updateResult = await Model[modelName].update(payload, {
//         where: {
//           id,
//         },
//       });
//       if (updateResult[0] === 0) {
//         return res
//           .status(404)
//           .json({ error: `Record with id '${id}' not found` });
//       }
//       record = await Model[modelName].findByPk(id);
//     } else {
//       // Insert data
//       record = await Model[modelName].create(payload);
//     }

//     // Handle associations if provided
//     if (include && include.modelName && include.payload) {
//       const childModel = Model[include.modelName];
//       if (childModel) {
//         for (const childPayload of include.payload) {
//           await childModel.create({
//             ...childPayload,
//             [modelName + "Id"]: record.id,
//           });
//         }
//       }
//     }

//     res.status(201).json(record);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const setModelData = async (req, res) => {
  try {
    const { modelName, payload, id, include } = req.body;

    console.log("Set Model Data : ", req.body);

    // Validate the request data
    if (!modelName || !payload) {
      return res.status(400).json({
        error: "Model name and payload are required in the request body",
      });
    }

    // Check if the model exists
    if (!Model[modelName]) {
      return res.status(404).json({ error: `Model '${modelName}' not found` });
    }

    // Create or update data
    let record;
    if (id) {
      // Delete existing associated records based on the provided id in include
      if (include && include.modelName) {
        const childModel = Model[include.modelName];
        if (childModel) {
          await childModel.destroy({
            where: {
              [modelName + "Id"]: id,
            },
          });
        }
      }

      // Update the main record
      const updateResult = await Model[modelName].update(payload, {
        where: {
          id,
        },
      });

      if (updateResult[0] === 0) {
        return res
          .status(404)
          .json({ error: `Record with id '${id}' not found` });
      }

      record = await Model[modelName].findByPk(id);
    } else {
      // Insert data
      record = await Model[modelName].create(payload);
    }

    // Handle associations if provided
    if (include && include.modelName && include.payload) {
      const childModel = Model[include.modelName];
      if (childModel) {
        for (const childPayload of include.payload) {
          await childModel.create({
            ...childPayload,
            [modelName + "Id"]: record.id,
          });
        }
      }
    }

    res.status(201).json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const remvoeModelData = async (req, res) => {
  try {
    const { modelName, id } = req.body;

    console.log("Remove Model Data : ", req.body);

    // Validate the request data
    if (!modelName || !id) {
      return res.status(400).json({
        error: "Model name and id are required in the request body",
      });
    }

    // Check if the model exists
    if (!Model[modelName]) {
      return res.status(404).json({ error: `Model '${modelName}' not found` });
    }

    // Insert data
    const newRecord = await Model[modelName].destroy({
      where: {
        id,
      },
    });
    res.status(201).json("Record delete successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fetchData = async (req, res) => {
  try {
    const { modelName, columns, include, id } = req.body;

    // Validate the request data
    if (!modelName) {
      return res.status(400).json({
        error: "Model name and columns are required in the request body",
      });
    }

    // Check if the model exists
    if (!Model[modelName]) {
      return res.status(404).json({ error: `Model '${modelName}' not found` });
    }

    // Build the options object for Sequelize query
    let options = {
      where: { id },
      attributes: columns,
      include: buildIncludeArray(include),
    };

    if (!id)
      options = {
        attributes: columns,
        include: buildIncludeArray(include),
      };

    // Fetch data from the dynamically determined model
    const modelData = await Model[modelName].findAll(options);

    res.status(200).json(modelData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const buildIncludeArray = (include) => {
  if (!include || !Array.isArray(include)) {
    return [];
  }

  return include.map((assoc) => {
    const includeOptions = {
      model: Model[assoc.subModel],
    };

    if (assoc.include) {
      includeOptions.include = buildIncludeArray(assoc.include);
    }

    if (assoc.required !== undefined) {
      includeOptions.required = assoc.required;
    }

    return includeOptions;
  });
};

module.exports = {
  getModelData,
  setModelData,
  fetchData,
  remvoeModelData,
};
