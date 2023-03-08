let threshold = 0.1;

const parameterOfShape = (array) => {
  let p = 0;
  for (let i = 1; i < array.length; i++) {
    //dx              *    dx                    +       dy                *     dy
    p += Math.sqrt(
      (array[i].x - array[i - 1].x) * (array[i].x - array[i - 1].x) +
        (array[i].y - array[i - 1].y) * (array[i].y - array[i - 1].y)
    );
  }
  return p;
};

const areaOfTriangleWithThreeDots = (x1, y1, x2, y2, x3, y3) => {
  /// https://www.aplustopper.com/wp-content/uploads/2016/08/area-triangle-vertices.jpg
  ///reference to the equation
  const delta1 = x1 * y2 - x2 * y1;
  const delta2 = x2 * y3 - x3 * y2;
  const delta3 = x3 * y1 - x1 * y3;
  const area = 0.5 * Math.abs(delta1 + delta2 + delta3);
  return area;
};

const areaOfShape = (array, centerX, centerY) => {
  let result = 0;
  for (let i = 1; i < array.length; i++) {
    ///center
    ///array[i-1]
    ///array[i]
    let x1 = centerX;
    let y1 = centerY;
    let x2 = array[i - 1].x;
    let y2 = array[i - 1].y;
    let x3 = array[i].x;
    let y3 = array[i].y;

    result += areaOfTriangleWithThreeDots(x1, y1, x2, y2, x3, y3);

    //Area of rectangle with three dots
  }
  return result;
};

const centerOfShape = (array) => {
  let centerX = 0;
  let centerY = 0;
  for (let { x, y } of array) {
    centerX += x;
    centerY += y;
  }
  centerX /= array.length;
  centerY /= array.length;

  return [centerX, centerY];
};
///@Rahoul add clear description how this function work to the report
export const evaluateCircle = (array) => {
  ///calculate the area of the shape
  ///calculate the parameter of the shope
  ///A/P^2  =1/(4*PI)
  const parameter = parameterOfShape(array);
  const [centerX, centerY] = centerOfShape(array);
  const area = areaOfShape(array, centerX, centerY);

  ///in perfect circle delta=1
  const delta = (area / (parameter * parameter)) * 4 * Math.PI;

  if (Math.abs(delta - 1) < threshold) {
    return true;
  } else {
    return false;
  }
};

export const evaluateSquare = (array) => {
  ///calculate the area of the shape
  ///calculate the parameter of the shope
  ///A/P^2  =1/16
  const parameter = parameterOfShape(array);
  const [centerX, centerY] = centerOfShape(array);
  const area = areaOfShape(array, centerX, centerY);

  ///in perfect circle delta=1
  const delta = (area / (parameter * parameter)) * 16;

  if (Math.abs(delta - 1) < threshold) {
    return true;
  } else {
    return false;
  }
};

export const evaluateTriangle = (array) => {
  ///calculate the area of the shape
  ///calculate the parameter of the shope
  ///A/P^2  =sqrt(3)/36
  const parameter = parameterOfShape(array);
  const [centerX, centerY] = centerOfShape(array);
  const area = areaOfShape(array, centerX, centerY);

  ///in perfect circle delta=1
  const delta = ((area / (parameter * parameter)) * 36) / Math.sqrt(3);

  if (Math.abs(delta - 1) < threshold) {
    return true;
  } else {
    return false;
  }
};
