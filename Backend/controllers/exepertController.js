const Expert = require('../models/Expert');

// Get all experts with pagination, search, and category filter
exports.getExperts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || '';
    const category = req.query.category || '';

    const query = {
      name: { $regex: search, $options: 'i' }
    };

    if (category) {
      query.category = category;
    }

    const experts = await Expert.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Expert.countDocuments(query);

    res.json({
      experts,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get expert by ID
exports.getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);

    if (!expert) {
      return res.status(404).json({
        message: 'Expert not found'
      });
    }

    res.json(expert);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};