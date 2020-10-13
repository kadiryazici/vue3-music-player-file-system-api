export const fixName = (name: string): string => {
   const a = name.split(".");
   a.pop();
   const b = a.join(".");
   return b;
};

export const convertSecondToMinuteAndSecond = (t: number) => {
   const time = parseInt(t.toString().split('.')[ 0 ]);
   const minute = Math.floor(time / 60);
   const second = time % 60;
   const result = `${minute}:${second < 10 ? `0${second}` : second}`;
   return result != 'NaN:NaN' ? result : '00:00'
}