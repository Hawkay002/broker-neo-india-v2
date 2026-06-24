export const Events = {
  MEDIA_ATTACHING: "hlsMediaAttaching",
  MEDIA_ATTACHED: "hlsMediaAttached",
  MEDIA_DETACHING: "hlsMediaDetaching",
  MEDIA_DETACHED: "hlsMediaDetached",
  MEDIA_ENDED: "hlsMediaEnded",
  BUFFER_RESET: "hlsBufferReset",
  BUFFER_CODECS: "hlsBufferCodecs",
  BUFFER_CREATED: "hlsBufferCreated",
  BUFFER_APPENDING: "hlsBufferAppending",
  BUFFER_APPENDED: "hlsBufferAppended",
  BUFFER_EOS: "hlsBufferEos",
  BUFFER_FLUSHING: "hlsBufferFlushing",
  BUFFER_FLUSHED: "hlsBufferFlushed",
  MANIFEST_LOADING: "hlsManifestLoading",
  MANIFEST_LOADED: "hlsManifestLoaded",
  MANIFEST_PARSED: "hlsManifestParsed",
  LEVEL_SWITCHING: "hlsLevelSwitching",
  LEVEL_SWITCHED: "hlsLevelSwitched",
  LEVEL_LOADING: "hlsLevelLoading",
  LEVEL_LOADED: "hlsLevelLoaded",
  LEVEL_UPDATED: "hlsLevelUpdated",
  LEVEL_PTS_UPDATED: "hlsLevelPtsUpdated",
  LEVELS_UPDATED: "hlsLevelsUpdated",
  AUDIO_TRACKS_UPDATED: "hlsAudioTracksUpdated",
  AUDIO_TRACK_SWITCHING: "hlsAudioTrackSwitching",
  AUDIO_TRACK_SWITCHED: "hlsAudioTrackSwitched",
  AUDIO_TRACK_LOADING: "hlsAudioTrackLoading",
  AUDIO_TRACK_LOADED: "hlsAudioTrackLoaded",
  SUBTITLE_TRACKS_UPDATED: "hlsSubtitleTracksUpdated",
  SUBTITLE_TRACK_SWITCH: "hlsSubtitleTrackSwitch",
  SUBTITLE_TRACK_LOADING: "hlsSubtitleTrackLoading",
  SUBTITLE_TRACK_LOADED: "hlsSubtitleTrackLoaded",
  SUBTITLE_FRAG_PROCESSED: "hlsSubtitleFragProcessed",
  CUES_PARSED: "hlsCuesParsed",
  NON_NATIVE_TEXT_TRACKS_FOUND: "hlsNonNativeTextTracksFound",
  INIT_PTS_FOUND: "hlsInitPtsFound",
  FRAG_LOADING: "hlsFragLoading",
  FRAG_LOAD_EMERGENCY_ABORTED: "hlsFragLoadEmergencyAborted",
  FRAG_LOADED: "hlsFragLoaded",
  FRAG_DECRYPT_STARTED: "hlsFragDecryptStarted",
  FRAG_DECRYPTED: "hlsFragDecrypted",
  FRAG_PARSING_INIT_SEGMENT: "hlsFragParsingInitSegment",
  FRAG_PARSING_USERDATA: "hlsFragParsingUserdata",
  FRAG_PARSING_METADATA: "hlsFragParsingMetadata",
  FRAG_PARSED: "hlsFragParsed",
  FRAG_BUFFERED_DATA: "hlsFragBufferedData",
  FRAG_CHANGED: "hlsFragChanged",
  FPS_DROP: "hlsFpsDrop",
  FPS_DROP_LEVEL: "hlsFpsDropLevel",
  ERROR: "hlsError",
  DESTROYING: "hlsDestroying",
  KEY_LOADING: "hlsKeyLoading",
  KEY_LOADED: "hlsKeyLoaded",
  LIVE_BACK_BUFFER_REACHED: "hlsLiveBackBufferReached",
  BACK_BUFFER_REACHED: "hlsBackBufferReached",
  STEERING_MANIFEST_LOADED: "hlsSteeringManifestLoaded",
};

export default class Hls {
  static isSupported() {
    return false;
  }
  static get Events() {
    return Events;
  }
  static version = "0.0.0";
  static isMSESupported() {
    return false;
  }
  constructor() {
    this.url = "";
  }
  loadSource() {}
  attachMedia() {}
  detachMedia() {}
  destroy() {}
  on() {}
  off() {}
  once() {}
  trigger() {}
}
