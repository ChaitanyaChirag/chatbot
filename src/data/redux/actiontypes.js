const actionTypes = {
    /* -------------- page_details ------------------ */
    UPDATE_PAGE_STATE: "UPDATE_PAGE_STATE",
    // DEVICE_DATA_LOADED: "DEVICE_DATA_LOADED",
    // ENABLE_ADSTER_BOT: "ENABLE_ADSTER_BOT",

    /* --------------chatbot_details----------------- */

    UPDATE_CHATS_STATE: "UPDATE_CHATS_STATE",
    UPDATE_END_CHAT: "UPDATE_END_CHAT",
    MAKE_SOCKET_CONNECTION: "MAKE_SOCKET_CONNECTION",
    SOCKET_DISCONNECT: "SOCKET_DISCONNECT",
    CALL_SOCKET_METHOD: "CALL_SOCKET_METHOD",
    BOT_POPUP_REQUEST: "BOT_POPUP_REQUEST",
    EMIT_NEW_MESSAGE: "EMIT_NEW_MESSAGE",
    EMIT_CUSTOM_EVENT: "EMIT_CUSTOM_EVENT",
    MESSAGE_VOTING: "MESSAGE_VOTING",
    RESET_CHAT: "RESET_CHAT",
    SEND_FEEDBACK: "SEND_FEEDBACK",
    UPDATE_TYPING_INFO: "UPDATE_TYPING_INFO",
    UPDATE_MESSAGE: "UPDATE_MESSAGE",
    MESSAGE_SEEN: "MESSAGE_SEEN",

    

    UPDATE_PSID: "UPDATE_PSID",
    HANDLE_CHATBOT_INTERFACE: "HANDLE_CHATBOT_INTERFACE",
    SOCKET_CONNECTED: "SOCKET_CONNECTED",
    SOCKET_CONNECT_ERROR: "SOCKET_CONNECT_ERROR",
    SOCKET_ERROR: "SOCKET_ERROR",
    PUSH_RESPONSE_MESSAGE: "PUSH_RESPONSE_MESSAGE",
    PUSH_SENDER_MESSAGE: "PUSH_SENDER_MESSAGE",
    SET_DEFAULT_STATE: "SET_DEFAULT_STATE",
    SHOW_TYPING: "SHOW_TYPING",
    CLEAR_UNSEEN_MESSAGES: "CLEAR_UNSEEN_MESSAGES",
    GET_WEBSITE_DATA: "GET_WEBSITE_DATA",
    UPDATE_FILE_UPLOAD_MESSAGE: "UPDATE_FILE_UPLOAD_MESSAGE",
};

export default actionTypes;