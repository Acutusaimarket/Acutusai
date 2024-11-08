const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config'); 

class ResearchSurvey extends Model {}

ResearchSurvey.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    survey_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false 
    },
    survey_name: DataTypes.STRING,
    account_name: DataTypes.STRING,
    country_language: DataTypes.STRING,
    industry: DataTypes.STRING,
    study_type: DataTypes.STRING,
    bid_length_of_interview: DataTypes.INTEGER,
    bid_incidence: DataTypes.FLOAT,
    collects_pii: DataTypes.BOOLEAN,
    survey_group_ids: DataTypes.JSON, // Store as JSON for MariaDB compatibility
    is_live: DataTypes.BOOLEAN,
    survey_quota_calc_type: DataTypes.STRING,
    is_only_supplier_in_group: DataTypes.BOOLEAN,
    cpi: DataTypes.FLOAT,
    total_client_entrants: DataTypes.INTEGER,
    total_remaining: DataTypes.INTEGER,
    completion_percentage: DataTypes.FLOAT,
    conversion: DataTypes.FLOAT,
    overall_completes: DataTypes.INTEGER,
    mobile_conversion: DataTypes.FLOAT,
    earnings_per_click: DataTypes.FLOAT,
    length_of_interview: DataTypes.INTEGER,
    termination_length_of_interview: DataTypes.INTEGER,
    respondent_pids: DataTypes.JSON, // Store as JSON for MariaDB compatibility
    message_reason: DataTypes.STRING
}, {
    sequelize,
    modelName: 'ResearchSurvey',
    tableName: 'research_surveys',  // Changed table name
    indexes: [
        {
            fields: ['survey_id']  // Add index on survey_id for better query performance
        }
    ]
});

class ResearchSurveyQuota extends Model {}

ResearchSurveyQuota.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    survey_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'research_surveys', key: 'survey_id' }  // Now references survey_id instead of id
    },
    survey_quota_type: DataTypes.STRING,
    quota_cpi: DataTypes.FLOAT,
    conversion: DataTypes.FLOAT,
    number_of_respondents: DataTypes.INTEGER,
    questions: DataTypes.JSON // Store questions array as JSON
}, {
    sequelize,
    modelName: 'ResearchSurveyQuota',
    tableName: 'research_survey_quotas'  // Changed table name
});

class ResearchSurveyQualification extends Model {}

ResearchSurveyQualification.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    survey_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'research_surveys', key: 'survey_id' }  // Now references survey_id instead of id
    },
    logical_operator: DataTypes.STRING,
    precodes: DataTypes.JSON, // Store as JSON for compatibility
    question_id: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'ResearchSurveyQualification',
    tableName: 'research_survey_qualifications'  // Changed table name
});

// Associations
ResearchSurvey.hasMany(ResearchSurveyQuota, { 
    foreignKey: 'survey_id', 
    sourceKey: 'survey_id',  // Important: use survey_id as the source key
    as: 'survey_quotas' 
});
ResearchSurveyQuota.belongsTo(ResearchSurvey, { 
    foreignKey: 'survey_id',
    targetKey: 'survey_id'  // Important: use survey_id as the target key
});

ResearchSurvey.hasMany(ResearchSurveyQualification, { 
    foreignKey: 'survey_id',
    sourceKey: 'survey_id',  // Important: use survey_id as the source key
    as: 'survey_qualifications' 
});
ResearchSurveyQualification.belongsTo(ResearchSurvey, { 
    foreignKey: 'survey_id',
    targetKey: 'survey_id'  // Important: use survey_id as the target key
});

module.exports = { ResearchSurvey, ResearchSurveyQuota, ResearchSurveyQualification };