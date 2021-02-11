export function getLocalSession(storage, key) {
  // Attempt to get local session from storage
  const cachedSession = storage.getItem(key);
  let session = null;
  if (cachedSession) {
    // Found existing session in storage
    const parsedSession = JSON.parse(cachedSession);
    // Format conversation from array of object to immutable Map for use by messages components
    const formattedConversation = parsedSession.conversation
      ? parsedSession.conversation
      : [];
    // Check if params is undefined
    const formattedParams = parsedSession.params
      ? parsedSession.params
      : {};
    const formattedMetadata = parsedSession.metadata
      ? parsedSession.metadata
      : {};
    // Create a new session to return
    session = {
      ...parsedSession,
      conversation: formattedConversation,
      params: formattedParams,
      metadata: formattedMetadata
    };
  }
  // Returns a formatted session object if any found, otherwise return undefined
  return session;
}

export function storeLocalSession(storage, key, sid) {
  // Attempt to store session id to local storage
  const cachedSession = storage.getItem(key);
  let session;
  if (cachedSession) {
    // Found exisiting session in storage
    const parsedSession = JSON.parse(cachedSession);
    session = {
      ...parsedSession,
      session_id: sid
    };
  } else {
    // No existing local session, create a new empty session with only session_id
    session = {
      session_id: sid
    };
  }
  // Store updated session to storage
  storage.setItem(key, JSON.stringify(session));
}

export const storeMessageTo = storage => (conversation) => {
  // Store a conversation List to storage
  const localSession = getLocalSession(storage, 'SESSION_NAME');
  const newSession = {
    // Since immutable List is not a native JS object, store conversation as array
    ...localSession,
    conversation: conversation.toJS(),
    lastUpdate: Date.now()
  };
  storage.setItem('SESSION_NAME', JSON.stringify(newSession));
  return conversation;
};

export const storeParamsTo = storage => (params) => {
  // Store a params List to storage
  const localSession = getLocalSession(storage, 'SESSION_NAME');
  const newSession = {
    // Since immutable Map is not a native JS object, store conversation as array
    ...localSession,
    params: params.toJS(),
    lastUpdate: Date.now(),
    version: 'PACKAGE_VERSION_TO_BE_REPLACED'
  };
  storage.setItem('SESSION_NAME', JSON.stringify(newSession));
  return params;
};


export const storeMetadataTo = storage => (metadata) => {
  // Store a params List to storage
  const localSession = getLocalSession(storage, 'SESSION_NAME');
  const newSession = {
    // Since immutable Map is not a native JS object, store conversation as array
    ...localSession,
    metadata: metadata.toJS(),
    lastUpdate: Date.now()
  };
  storage.setItem('SESSION_NAME', JSON.stringify(newSession));
  return metadata;
};
