import React, { useState, useRef, useEffect } from "react";

const AudioRecorder = () => {
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState<any>(null);
  const [showBar, setShowBar] = useState<boolean>(false);
  const [key, setKey] = useState(0); // Add a key variable
  const mediaRecorder = useRef<any>(null);
  const mimeType = "audio/webm";

  const startRecording = async () => {
    try {
      setShowBar(false);
      await setAudioChunks([]);
      setKey((prevKey) => prevKey + 1); // Update the key to trigger re-render
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setRecordingStatus("recording");

      const media = new MediaRecorder(stream, { mimeType });
      mediaRecorder.current = media;
      mediaRecorder.current.start();

      let localAudioChunks: any = [];
      mediaRecorder.current.ondataavailable = (event: { data: { size: number } }) => {
        if (typeof event.data === "undefined") return;
        if (event.data.size === 0) return;
        localAudioChunks.push(event.data);
      };

      await setAudioChunks(localAudioChunks);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
      setShowBar(true);
    };
  };

  const handleRecordedAudio = (audio: string | null, mimeType: string) => {
    if (!audio || !showBar) {
      return null;
    }

    return (
      <div key={key}>
        <p>Recorded Audio:</p>
        <audio controls>
          <source src={audio} type={mimeType} />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  };

  useEffect(() => {
  }, [audio, showBar, key]); 

  return (
    <div>
      <button onClick={startRecording} disabled={recordingStatus === "recording"}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={recordingStatus === "inactive"}>
        Stop Recording
      </button>
      {handleRecordedAudio(audio, mimeType)}
    </div>
  );
};

export default AudioRecorder;
  