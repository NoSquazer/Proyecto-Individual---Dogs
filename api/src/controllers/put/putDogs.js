const { Dog } = require("../../db");

module.exports = async (req, res) => {
  try {
    const { id, ...updates } = req.body;

    const dogToUpdate = await Dog.findByPk(id);

    if (!dogToUpdate) return res.status(404).json({ error: "Not found!" });

    for (const prop in updates) {
      if (prop in dogToUpdate) {
        dogToUpdate[prop] = updates[prop];
      }
    }

    await dogToUpdate.save();

    return res.json({ message: "Dog updated succesfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
