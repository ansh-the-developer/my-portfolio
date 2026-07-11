import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

// Beethoven's Für Elise full melody & accompaniment sequence
const tempo = 0.22; // Seconds per 16th note
const furEliseNotes = [
  // --- SECTION A (Theme Intro) ---
  { note: 659.25, dur: 1 }, // E5
  { note: 622.25, dur: 1 }, // D#5
  { note: 659.25, dur: 1 }, // E5
  { note: 622.25, dur: 1 }, // D#5
  { note: 659.25, dur: 1 }, // E5
  { note: 493.88, dur: 1 }, // B4
  { note: 587.33, dur: 1 }, // D5
  { note: 523.25, dur: 1 }, // C5
  
  { note: 440.00, dur: 3, bass: 110.00 }, // A4, A2
  { note: 0, dur: 1, bass: 164.81 },       // rest, E3
  { note: 0, dur: 1, bass: 220.00 },       // rest, A3
  { note: 261.63, dur: 1 },                 // C4
  
  { note: 329.63, dur: 1 },                 // E4
  { note: 440.00, dur: 1 },                 // A4
  { note: 493.88, dur: 3, bass: 82.41 },   // B4, E2
  { note: 0, dur: 1, bass: 164.81 },       // rest, E3
  { note: 0, dur: 2, bass: 207.65 },       // rest, G#3
  { note: 329.63, dur: 1 },                 // E4
  
  { note: 415.30, dur: 1 },                 // G#4
  { note: 493.88, dur: 1 },                 // B4
  { note: 523.25, dur: 3, bass: 110.00 },  // C5, A2
  { note: 0, dur: 1, bass: 164.81 },       // rest, E3
  { note: 0, dur: 2, bass: 220.00 },       // rest, A3
  { note: 659.25, dur: 1 },                 // E5
  
  { note: 622.25, dur: 1 }, // D#5
  
  { note: 659.25, dur: 1 }, // E5
  { note: 622.25, dur: 1 }, // D#5
  { note: 659.25, dur: 1 }, // E5
  { note: 493.88, dur: 1 }, // B4
  { note: 587.33, dur: 1 }, // D5
  { note: 523.25, dur: 1 }, // C5
  
  { note: 440.00, dur: 3, bass: 110.00 }, // A4, A2
  { note: 0, dur: 1, bass: 164.81 },       // rest, E3
  { note: 0, dur: 1, bass: 220.00 },       // rest, A3
  { note: 261.63, dur: 1 },                 // C4
  
  { note: 329.63, dur: 1 },                 // E4
  { note: 440.00, dur: 1 },                 // A4
  { note: 493.88, dur: 3, bass: 82.41 },   // B4, E2
  { note: 0, dur: 1, bass: 164.81 },       // rest, E3
  { note: 0, dur: 2, bass: 207.65 },       // rest, G#3
  { note: 523.25, dur: 1 },                 // C5
  
  { note: 493.88, dur: 1 },                 // B4
  { note: 440.00, dur: 3, bass: 110.00 },  // A4, A2
  { note: 0, dur: 1, bass: 164.81 },       // rest, E3
  { note: 0, dur: 2, bass: 220.00 },       // rest, A3
  { note: 0, dur: 2 },                      // rest

  // --- SECTION B (C Major Modulation / F Major Arpeggios) ---
  { note: 493.88, dur: 1, bass: 130.81 }, // B4, C3
  { note: 523.25, dur: 1, bass: 196.00 }, // C5, G3
  { note: 587.33, dur: 1, bass: 261.63 }, // D5, C4
  
  { note: 659.25, dur: 3, bass: 329.63 }, // E5, E4
  { note: 0, dur: 1, bass: 196.00 },       // rest, G3
  { note: 698.46, dur: 1, bass: 349.23 }, // F5, F4
  { note: 659.25, dur: 1 },                 // E5
  
  { note: 587.33, dur: 3, bass: 293.66 }, // D5, D4
  { note: 0, dur: 1, bass: 196.00 },       // rest, G3
  { note: 523.25, dur: 1, bass: 261.63 }, // C5, C4
  { note: 493.88, dur: 1 },                 // B4
  
  { note: 440.00, dur: 3, bass: 220.00 }, // A4, A3
  { note: 0, dur: 1, bass: 174.61 },       // rest, F3
  { note: 523.25, dur: 1, bass: 261.63 }, // C5, C4
  { note: 440.00, dur: 1 },                 // A4
  
  { note: 392.00, dur: 3, bass: 196.00 }, // G4, G3
  { note: 0, dur: 1, bass: 164.81 },       // rest, E3
  { note: 440.00, dur: 1, bass: 220.00 }, // A4, A3
  { note: 392.00, dur: 1 },                 // G4
  
  { note: 349.23, dur: 3, bass: 174.61 }, // F4, F3
  { note: 0, dur: 1, bass: 130.81 },       // rest, C3
  { note: 392.00, dur: 1, bass: 196.00 }, // G4, G3
  { note: 349.23, dur: 1 },                 // F4
  
  { note: 329.63, dur: 4, bass: 164.81 }, // E4, E3
  { note: 0, dur: 2 },                      // rest

  // --- SECTION C (Return to Theme A) ---
  { note: 659.25, dur: 1 }, // E5
  { note: 622.25, dur: 1 }, // D#5
  { note: 659.25, dur: 1 }, // E5
  { note: 622.25, dur: 1 }, // D#5
  { note: 659.25, dur: 1 }, // E5
  { note: 493.88, dur: 1 }, // B4
  { note: 587.33, dur: 1 }, // D5
  { note: 523.25, dur: 1 }, // C5
  
  { note: 440.00, dur: 3, bass: 110.00 }, // A4, A2
  { note: 0, dur: 1, bass: 164.81 },       // rest, E3
  { note: 0, dur: 1, bass: 220.00 },       // rest, A3
  { note: 261.63, dur: 1 },                 // C4
  
  { note: 329.63, dur: 1 },                 // E4
  { note: 440.00, dur: 1 },                 // A4
  { note: 493.88, dur: 3, bass: 82.41 },   // B4, E2
  { note: 0, dur: 1, bass: 164.81 },       // rest, E3
  { note: 0, dur: 2, bass: 207.65 },       // rest, G#3
  { note: 329.63, dur: 1 },                 // E4
  
  { note: 415.30, dur: 1 },                 // G#4
  { note: 493.88, dur: 1 },                 // B4
  { note: 523.25, dur: 3, bass: 110.00 },  // C5, A2
  { note: 0, dur: 1, bass: 164.81 },       // rest, E3
  { note: 0, dur: 2, bass: 220.00 },       // rest, A3
  { note: 659.25, dur: 1 },                 // E5
  
  { note: 622.25, dur: 1 }, // D#5
  
  { note: 659.25, dur: 1 }, // E5
  { note: 622.25, dur: 1 }, // D#5
  { note: 659.25, dur: 1 }, // E5
  { note: 493.88, dur: 1 }, // B4
  { note: 587.33, dur: 1 }, // D5
  { note: 523.25, dur: 1 }, // C5
  
  { note: 440.00, dur: 3, bass: 110.00 }, // A4, A2
  { note: 0, dur: 1, bass: 164.81 },       // rest, E3
  { note: 0, dur: 1, bass: 220.00 },       // rest, A3
  { note: 261.63, dur: 1 },                 // C4
  
  { note: 329.63, dur: 1 },                 // E4
  { note: 440.00, dur: 1 },                 // A4
  { note: 493.88, dur: 3, bass: 82.41 },   // B4, E2
  { note: 0, dur: 1, bass: 164.81 },       // rest, E3
  { note: 0, dur: 3 }                       // end theme measures padding
];

const playPianoNote = (ctx, freq, startTime, duration, targetNode, type = "triangle", vol = 0.15) => {
  if (freq === 0) return; // Rest note

  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);

  // Add clean sine overtone for string body resonance harmonics
  const overtone = ctx.createOscillator();
  overtone.type = "sine";
  overtone.frequency.setValueAtTime(freq * 2, startTime);

  const oscGain = ctx.createGain();
  const overtoneGain = ctx.createGain();

  // Attack: 15ms, Decay: exponential curves
  oscGain.gain.setValueAtTime(0, startTime);
  oscGain.gain.linearRampToValueAtTime(vol, startTime + 0.015);
  oscGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  overtoneGain.gain.setValueAtTime(0, startTime);
  overtoneGain.gain.linearRampToValueAtTime(vol * 0.45, startTime + 0.015);
  overtoneGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.connect(oscGain);
  overtone.connect(overtoneGain);
  oscGain.connect(targetNode);
  overtoneGain.connect(targetNode);

  osc.start(startTime);
  overtone.start(startTime);

  osc.stop(startTime + duration + 0.1);
  overtone.stop(startTime + duration + 0.1);
};

const CyberAudioController = ({ startTriggered }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem("cyber_audio_muted") === "true";
  });
  const [volume, setVolume] = useState(() => {
    const savedVol = localStorage.getItem("cyber_audio_volume");
    return savedVol !== null ? parseFloat(savedVol) : 0.35;
  });

  const audioContextRef = useRef(null);
  const gainNodeRef = useRef(null);
  const nextNoteTimeRef = useRef(0);
  const noteIndexRef = useRef(0);
  const schedulerIntervalRef = useRef(null);

  // Synthesizer scheduler loop
  const initSynth = () => {
    if (audioContextRef.current) return;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioContextRef.current = ctx;

      // Master output volume control
      const masterGain = ctx.createGain();
      // Cap max volume at 0.15 for soft background classical piano
      masterGain.gain.value = isMuted ? 0 : volume * 0.15;

      const lowpassFilter = ctx.createBiquadFilter();
      lowpassFilter.type = "lowpass";
      lowpassFilter.frequency.value = 850; // Warm room piano cutoff

      masterGain.connect(lowpassFilter);
      lowpassFilter.connect(ctx.destination);

      gainNodeRef.current = masterGain;
      nextNoteTimeRef.current = ctx.currentTime;
      noteIndexRef.current = 0;

      // Start scheduling loop
      schedulerIntervalRef.current = setInterval(scheduler, 150);
      setIsPlaying(true);
    } catch (err) {
      console.error("Failed to initialize Für Elise synth audio context:", err);
    }
  };

  const scheduler = () => {
    if (!audioContextRef.current) return;

    // Look ahead 300ms to avoid audio gaps/stuttering
    while (nextNoteTimeRef.current < audioContextRef.current.currentTime + 0.3) {
      const noteObj = furEliseNotes[noteIndexRef.current];
      const scheduleTime = nextNoteTimeRef.current;

      // Play melody note
      playPianoNote(
        audioContextRef.current,
        noteObj.note,
        scheduleTime,
        noteObj.dur * tempo,
        gainNodeRef.current,
        "triangle",
        0.12
      );

      // Play accompanying bass note
      if (noteObj.bass) {
        playPianoNote(
          audioContextRef.current,
          noteObj.bass,
          scheduleTime,
          noteObj.dur * tempo,
          gainNodeRef.current,
          "sine",
          0.06
        );
      }

      // Advance schedule pointer
      nextNoteTimeRef.current += noteObj.dur * tempo;
      noteIndexRef.current = (noteIndexRef.current + 1) % furEliseNotes.length;
    }
  };

  // Immediate and click-activated triggers to comply with browser gesture policies
  useEffect(() => {
    // Attempt automatic load
    initSynth();

    const resumeAudio = () => {
      if (audioContextRef.current) {
        if (audioContextRef.current.state === "suspended") {
          audioContextRef.current.resume();
        }
      } else {
        initSynth();
      }
    };

    window.addEventListener("click", resumeAudio);
    window.addEventListener("scroll", resumeAudio);
    window.addEventListener("touchstart", resumeAudio);

    return () => {
      window.removeEventListener("click", resumeAudio);
      window.removeEventListener("scroll", resumeAudio);
      window.removeEventListener("touchstart", resumeAudio);
    };
  }, []);

  useEffect(() => {
    if (startTriggered) {
      if (audioContextRef.current) {
        if (audioContextRef.current.state === "suspended") {
          audioContextRef.current.resume();
        }
      } else {
        initSynth();
      }
    }
  }, [startTriggered]);

  useEffect(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      const activeVolume = isMuted ? 0 : volume * 0.15;
      gainNodeRef.current.gain.setValueAtTime(activeVolume, audioContextRef.current.currentTime);
    }
    localStorage.setItem("cyber_audio_volume", volume.toString());
  }, [volume, isMuted]);

  useEffect(() => {
    localStorage.setItem("cyber_audio_muted", isMuted.toString());
  }, [isMuted]);

  useEffect(() => {
    return () => {
      if (schedulerIntervalRef.current) {
        clearInterval(schedulerIntervalRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const handleToggleMute = () => {
    if (!audioContextRef.current) {
      initSynth();
    } else if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (val) => {
    if (!audioContextRef.current) {
      initSynth();
    } else if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
    setVolume(val);
    if (isMuted && val > 0) {
      setIsMuted(false);
    }
  };

  return (
    <Box
      position="fixed"
      bottom="20px"
      left="20px"
      zIndex="15000"
      bg="gray.900"
      border="1px solid"
      borderColor="gray.600"
      p={2}
      borderRadius="0"
      boxShadow="0 4px 12px rgba(0,0,0,0.5)"
    >
      <HStack spacing={2} w="150px">
        <IconButton
          size="xs"
          variant="ghost"
          color="white"
          onClick={handleToggleMute}
          aria-label={isMuted ? "Unmute classical audio" : "Mute classical audio"}
        >
          {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
        </IconButton>
        <Box
          as="input"
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
          style={{
            width: "60px",
            height: "4px",
            background: "gray",
            outline: "none",
            cursor: "pointer",
            accentColor: "#c778dd"
          }}
          aria-label="Für Elise ambient volume"
        />
        <Text fontSize="10px" color="gray.400" fontFamily='"Fira Code", monospace' userSelect="none">
          ELISE
        </Text>
      </HStack>
    </Box>
  );
};

export default CyberAudioController;
