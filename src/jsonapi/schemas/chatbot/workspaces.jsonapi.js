const workspacesJsonApiSchema = {
  id: 'id',
  topLevelMeta(data, extraData) {
    return {
      count: extraData.count,
      total: data.length,
    };
  },
};

module.exports = workspacesJsonApiSchema;
