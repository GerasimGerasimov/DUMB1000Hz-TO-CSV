import fs = require ("fs");
import { Settings } from "./utils/config";

console.log('Start DUMB2CSV');

const fileContent: any = fs.readFileSync('./data/22162724.DMP');

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