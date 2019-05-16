const filters = {
    ACTIVE: {key: 'active', label: 'Active'},
    DELETED: {key: 'deleted', label: 'Deleted'},

    toArray: function() {
        return [this.ACTIVE, this.DELETED];
    },
};

export default filters;
