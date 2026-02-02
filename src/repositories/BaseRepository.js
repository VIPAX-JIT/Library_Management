class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        return await this.model.create(data);
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async findAll(filter = {}, sort = {}, skip = 0, limit = 10) {
        return await this.model.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit);
    }

    async update(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }

    async delete(id) {
        // Soft delete implementation preferred, but keeping generic delete for base
        // Specific repositories can override for soft delete
        return await this.model.findByIdAndDelete(id);
    }

    async count(filter = {}) {
        return await this.model.countDocuments(filter);
    }
}

export default BaseRepository;
