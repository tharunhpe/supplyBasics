export default function validateCSVfile(file) {
  let errors;
  if (file) {
    const fileName = file.name;
    const maxSize = 1048576;
    const validExts = new Array('.csv');

    const fileExt = fileName.substring(fileName.lastIndexOf('.'));
    if ((validExts.indexOf(fileExt) < 0) || (file.size > maxSize)) {
      errors = 'CSV files of size < 1 MB are supported.';
    }
  } else {
    errors = 'Invalid file.';
  }
  return errors;
}
