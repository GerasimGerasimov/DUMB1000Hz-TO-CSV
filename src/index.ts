import fs = require ("fs");
import { Settings } from "./utils/config";

console.log('Start DUMB2CSV');

const src: Uint8Array = new Uint8Array(fs.readFileSync('./data/25192845.DMP'));

class TDump{
  T1000Hz: number;//u16
  Igen: number;//s16
  UgenAB: number;//s16
  UgenBC: number;//s16
  UgenCA: number;//s16
  Iexc: number;//u16
  Uexc: number;//s16
  Triggers: number;//u16
  TimeMS: number;//u16
  TimeDH: number;//u16
  TimeYM: number;//u16
  Faults: number;//u16
  gap: number;//u16
}

const FileSize: number = src.byteLength;

const step: number = 26;
var index: number = 0;
var res: string = 'T1000Hz;Igen;UgenAB;UgenBC;UgenCA;Iexc;Uexc;Trig;Faults;DateTime\n';

while (index < FileSize) {
  let s: string = '';
  let dump: TDump = new TDump();
  let d = new DataView(src.buffer, index, step);
  dump.T1000Hz = d.getUint16(0, true);
  dump.Igen = d.getInt16(2, true);
  dump.UgenAB = d.getInt16(4, true);
  dump.UgenBC = d.getInt16(6, true);
  dump.UgenCA = d.getInt16(8, true);
  dump.Iexc = d.getUint16(10, true) * 0.01;
  dump.Uexc = d.getInt16(12, true) * 0.1;
  dump.Triggers = d.getUint16(14, true);
  dump.TimeMS = d.getUint16(16, true);
  dump.TimeDH = d.getUint16(18, true);
  dump.TimeYM = d.getUint16(20, true);

  dump.Faults = d.getUint16(22, true);
  index += step;
  s = dump.T1000Hz.toString() + ";" +
      dump.Igen.toString() + ";" +
      dump.UgenAB.toString() + ";" +
      dump.UgenBC.toString() + ";" +
      dump.UgenCA.toString() + ";" +
      dump.Iexc.toString().replace(".",",") + ";" +//в Excel нужна запятая
      dump.Uexc.toString().replace(".",",") + ";" +
      dump.Triggers.toString() + ";" +
      dump.Faults.toString() + ";" +
      //собрать дату из TimeMS TimeDH TimeYM и T1000Hz
      getDumpTime(dump.TimeMS, dump.TimeDH, dump.TimeYM, dump.T1000Hz) +
      "\n";
  res += s;
}

fs.writeFileSync("./res.csv", res);

console.log('Complete DUMB2CSV');

function getDumpTime (TimeMS: number, TimeDH: number, TimeYM: number, T1000Hz : number): string {
  let res: string = '';
  let year: number = 2000 + (TimeYM >> 8); 
  let month: number = (TimeYM & 0xFF);
  let day: number = (TimeDH >> 8); 
  let hours: number = (TimeDH & 0xFF);
  let minutes: number = (TimeMS >> 8);
  let seconds: number = (TimeMS & 0xFF);
  let ms: number = T1000Hz;
  let date = new Date(year, month, day, hours, minutes, seconds, ms);
  //TODO формат данных дата-время с милисекундами м/д/гггг ч:мм:сс.000
  res = date.getMonth().toString() + '/' +
        date.getDate().toString() + '/' +
        date.getFullYear().toString() + '/' +
        ' ' +
        date.getHours() + ':' +
        date.getMinutes() + ':' +
        date.getSeconds() + '.' +
        date.getMilliseconds();
  return res;
}

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