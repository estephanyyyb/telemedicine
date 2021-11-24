export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "telemedicinebcbb0ab7": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        },
        "userPoolGroups": {
            "adminGroupRole": "string",
            "doctorsGroupRole": "string",
            "nursesGroupRole": "string",
            "patientsGroupRole": "string"
        }
    },
    "function": {
        "telemedicinea0e20537": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "api": {
        "telemedicineApi4": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    }
}