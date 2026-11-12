// Original eight-bar chiptune, synthesized locally. No audio downloads or autoplay.
const melody = [
  72, 0, 76, 79, 76, 74, 72, 67, 69, 72, 76, 0, 74, 72, 69, 0, 65, 69, 72, 77,
  76, 72, 69, 65, 67, 71, 74, 79, 77, 74, 71, 0, 84, 79, 76, 72, 74, 76, 79, 0,
  81, 76, 72, 69, 72, 74, 76, 0, 77, 76, 72, 69, 65, 69, 72, 76, 74, 71, 67, 0,
  71, 74, 72, 0,
];
const chords = [
  [48, 4],
  [45, 3],
  [41, 4],
  [43, 4],
  [48, 4],
  [45, 3],
  [41, 4],
  [43, 4],
];
const frequency = (midi) => 440 * 2 ** ((midi - 69) / 12);
const pulse = (phase, duty = 0.25) => (phase % 1 < duty ? 1 : -1);

function createSong(context) {
  const sampleRate = 22050;
  const stepLength = 60 / 108 / 2;
  const duration = melody.length * stepLength;
  const buffer = context.createBuffer(
    1,
    Math.ceil(duration * sampleRate),
    sampleRate,
  );
  const data = buffer.getChannelData(0);
  let noise = 1381;
  for (let i = 0; i < data.length; i++) {
    const time = i / sampleRate;
    const step = Math.min(melody.length - 1, Math.floor(time / stepLength));
    const local = time % stepLength;
    const envelope =
      Math.min(1, local / 0.005) * Math.max(0, 1 - local / (stepLength * 0.85));
    const note = melody[step];
    const lead = note ? pulse(time * frequency(note)) * envelope * 0.35 : 0;
    const [root, third] = chords[Math.floor(step / 8)];
    const bassTime = time % (stepLength * 2);
    const bass =
      pulse(time * frequency(root), 0.5) *
      Math.max(0, 1 - bassTime / (stepLength * 1.8)) *
      0.25;
    const arpeggioNote = root + 12 + [0, third, 7, 12][step % 4];
    const arpeggio =
      pulse(time * frequency(arpeggioNote), 0.125) * envelope * 0.1;
    noise ^= noise << 13;
    noise ^= noise >>> 17;
    noise ^= noise << 5;
    const hiHat = (noise / 2147483648) * Math.exp(-local * 100) * 0.08;
    const beatTime = time % (stepLength * 2);
    const kick =
      Math.sin(
        2 * Math.PI * (45 * beatTime + 1.3 * (1 - Math.exp(-beatTime * 45))),
      ) *
      Math.exp(-beatTime * 24) *
      0.22;
    const edge = Math.max(
      0,
      Math.min(1, time / 0.008, (duration - time) / 0.008),
    );
    const sample = (lead + bass + arpeggio + hiHat + kick) * edge;
    data[i] = Math.round(Math.max(-1, Math.min(1, sample)) * 127) / 127;
  }
  return buffer;
}

export class ChiptunePlayer {
  context = null;
  source = null;

  async play() {
    if (this.context?.state === "running") return "Already playing.";
    if (!this.context) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext)
        throw new Error("Audio is unavailable in this browser.");
      this.context = new AudioContext();
      const volume = this.context.createGain();
      volume.gain.value = 0.12;
      volume.connect(this.context.destination);
      this.source = this.context.createBufferSource();
      this.source.buffer = createSong(this.context);
      this.source.loop = true;
      this.source.connect(volume);
      this.source.start();
    }
    await this.context.resume();
    return "Playing 8-bit music.";
  }

  async pause() {
    if (this.context?.state === "running") await this.context.suspend();
    return "Music paused.";
  }

  dispose() {
    this.source?.stop();
    this.source?.disconnect();
    this.context?.close().catch(() => {});
    this.source = null;
    this.context = null;
  }
}
