const enum MessaginRequestSubjects {
    COMPOSE_FW_URL = "COMPOSE_FW_URL",
    COMPOSE_BEACON = "COMPOSE_BEACON",
    GET_ADS = "GET_ADS"

}

const enum MessaginPublishSubjects {
    SERVICES_STARTED = "SERVICES_STARTED",
    SERVICES_SHUTDOWN = "SERVICES_SHUTDOWN",
    NEW_REQUEST_BEGIN = "NEW_REQUEST_BEGIN",
    NEW_REQUEST_END = "NEW_REQUEST_END"
}

export {
    MessaginRequestSubjects,
    MessaginPublishSubjects
}