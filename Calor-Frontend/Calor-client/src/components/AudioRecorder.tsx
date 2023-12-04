import React, { useState, useRef, useEffect,useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import recordIcon from '../assets/icons8-record-ios-16-filled-32.png'
import sendIcon from '../assets/icons8-paper-plane-64.png'
import { ActiveChatContext } from "../context/ChatContext";


const AudioRecorder = () => {
  const {activeChat} = useContext(ActiveChatContext)
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState<any>(null);
  const [showBar, setShowBar] = useState<boolean>(false);
  const [key, setKey] = useState(0); // Add a key variable
  const mediaRecorder = useRef<any>(null);
  const mimeType = "audio/webm";
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);


  const startRecording = async () => {
    try {
      setShowBar(false);
      console.log("The recording chat  : ",activeChat)
      await setAudioChunks([]);
      setKey((prevKey) => prevKey + 1); // Update the key to trigger re-render
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setRecordingStatus("recording");

      setStartTime(Date.now());
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


  const stopRecording = async () => {
    setRecordingStatus("inactive");
    setElapsedTime(0);
    mediaRecorder.current.stop();

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const audioFormData = new FormData();
      audioFormData.append("audio_file", audioBlob, "recorded_audio.webm");
      // audioFormData.append()

      axios.post("http://localhost:8000/asr", audioFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "accept": "application/json",
        },
      })
        .then(response => {
          console.log("Received response:", response);
        })
        .catch(error => {
          console.error("Error uploading audio:", error);
        });

      setAudio(URL.createObjectURL(audioBlob));
      setAudioChunks([]);
      setShowBar(true);
      console.log("The audioFormData, final : ", audioFormData)
    };
  };

  const formatTime = (milliseconds: any) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const formattedSeconds = seconds % 60;
    return `${minutes}:${formattedSeconds < 10 ? '0' : ''}${formattedSeconds}`;
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

  useEffect(() => {
    let interval: any;

    if (recordingStatus === "recording") {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [recordingStatus, startTime]);

  return (
    <div className="AudioRecorderContainer">
      {
        recordingStatus !== "recording" ? <button onClick={startRecording} disabled={recordingStatus === "recording"} className="micControlBtn">   <FontAwesomeIcon icon={faMicrophone} className="micRecorder" />
          <span className="sr-only">Start Recording</span>
        </button> :
          <div className="stopControlBtnContainer">
            <div className="recordIconContainer">
              <img src={recordIcon} alt="" className="recordIcon" />
            </div>
            <div className="stopwatchDisplay">{formatTime(elapsedTime)}</div>
            <button onClick={stopRecording} className="micControlBtn">
              {/* Stop Recording */}
              <div className="sendIconContainer">
                <img src={sendIcon} alt="" className="sendIcon" />
              </div>
            </button>
          </div>
      }
      {handleRecordedAudio(audio, mimeType)}
    </div>
  );
}




export default AudioRecorder;
