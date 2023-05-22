import fs = require ("fs");
import { Settings } from "./utils/config";

console.log('Start DUMB2CSV');

const src: Uint16Array = new Uint16Array(fs.readFileSync('./data/22162724.DMP'));

class TDump{
  T1000Hz: number;//u16
  Igen: number;//s16
  UgenAB: Uint16Array;//s16
  UgenBC: Uint16Array;//s16
  UgenCA: Uint16Array;//s16
  Iexc: Uint16Array;//u16
  Uexc: Uint16Array;//s16
  Triggers: Uint16Array;//u16
  TimeMS: Uint16Array;//u16
  TimeDH: Uint16Array;//u16
  TimeYM: Uint16Array;//u16
  Faults: Uint16Array;//u16
  gap: Uint16Array;//u16
}

const FileSize: number = src.byteLength;

const step: number = 26;
var index: number = 0;

while (index < FileSize) {
  let dump: TDump = new TDump();
  let d = new DataView(src.buffer, index, step);
  dump.T1000Hz = d.getInt16(0, true);
  dump.Igen = d.getUint16(2, true);
  index += step;
}

//const Areas: Array<TFlashSegmen> = [...getResourses(Settings.resources || undefined)];
//write the Array binary data to res.bin file
//fs.writeFileSync("./res.bin",new Uint8Array(Areas[0].code));

console.log('Complete DUMB2CSV');

/*
файл состоит из таких записей
typedef struct TFastOscData {
  u16 T1000Hz;
  s16 Igen;
  s16 UgenAB;
  s16 UgenBC;
  s16 UgenCA;
  u16 Iexc;
  s16 Uexc;
  u16 Triggers;
  u16 TimeMS;
  u16 TimeDH;
  u16 TimeYM;
  u16 Faults;
  u16 gap;
} TFastOscData;

*/