export const evaluateCircle = (array) => {
  ///calculate the area of the shape
  ///calculate the parameter of the shope
  ///A/P^2  =1/(4*PI)
  let p = 0;
  for (let i = 1; i < array.length; i++) {
    //dx              *    dx                    +       dy                *     dy
    p += Math.sqrt(
      (array[i].x - array[i - 1].x) * (array[i].x - array[i - 1].x) +
        (array[i].y - array[i - 1].y) * (array[i].y - array[i - 1].y)
    );
  }
  let centerX = 0;
  let centerY = 0;
  for (let { x, y } of array) {
    centerX += x;
    centerY += y;
  }
  centerX /= array.length;
  centerY /= array.length;

  for (let i = 1; i < array.length; i++) {
    ///center
    ///array[i-1]
    ///arrat[i]
    let x1 = centerX;
    let y1 = centerY;
    let x2 = array[i - 1].x;
    let y2 = array[i - 1].y;
    let x3 = array[i].x;
    let y3 = array[i].y;
  }
};
