const { exec, spawn } = require("child_process");
const os = require("os");
class Record {
  constructor(processName) {
    this.processName = processName;
  }
  startRecord() {
    this.processName = spawn(
      "ffmpeg",
      [
        "-f",
        "dshow",
        "-rtbufsize",
        "40M",
        "-i",
        `audio="virtual-audio-capturer"`,
        "-f",
        "dshow",
        "-rtbufsize",
        "40M",
        "-i",
        `audio="麦克风 (Realtek(R) Audio)"`,
        "-filter_complex",
        "amix=inputs=2",
        "-f",
        "dshow",
        "-rtbufsize",
        "160M",
        "-framerate",
        "25",
        "-i",
        `video="screen-capture-recorder"`,
        "-pix_fmt",
        "yuv420p",
        "-c:v",
        "h264",
        "-c:a",
        "pcm_s16le",
        "-s",
        "1920*1080",
        "-b:v",
        "3000k",
        "-preset",
        "superfast",
        "out.avi"
      ],
      {
        shell: true,
        // detached: true,
        stdio: "ignore"
      }
    );
  }
  stopRecord() {
    if (os.platform() === "win32") {
      exec("taskkill /pid " + this.processName.pid + " /T /F");
    } else {
      this.processName.kill();
    }
  }
}
module.exports = Record;
