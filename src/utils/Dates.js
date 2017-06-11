import moment from 'moment';

class Dates {

  /**
   * Get current date in String
   * @return { String }
   */
  static getToday() {
    return moment().format('DD/MM/YYYY');
  }

  /**
   * Convert date to String
   * @param  { Date } date Javascript date
   * @param  { Boolean } time Add time to result
   * @return { String }
   */
  static convertToString(date, time) {
    let format = 'DD/MM/YYYY';

    if (time) format = `${format} 'HH:mm:ss'`;

    return moment(date).format(format);
  }

  /**
   * Convert date string to Javascript date
   * @param  { String } date date string
   * @return { Date }
   */
  static convertToDate(date) {
    return moment(date, 'DD/MM/YYYY').toDate();
  }

  /**
   * Check if it is a valid date
   * @param  { String }  date Date string
   * @return { Boolean }
   */
  static isValid(date) {
    return moment(date).isValid();
  }

  /**
   * Get current year
   * @return { String }
   */
  static getCurrentYear() {
    return moment().year();
  }

  /**
   * Get current month
   * @return { String }
   */
  static getCurrentMonth() {
    return moment().month();
  }

  /**
   * Get date between date to now
   * @param  { String } date date string
   * @return { String }
   */
  static getDateFromNow(date) {
    return moment(date).fromNow();
  }

  /**
   * Get date between date1 and date2
   * @param  { String } date  date string
   * @param  { String } date2 date2 string
   * @return { String }
   */
  static getDateFromDate(date, date2) {
    return moment(date).from(date2);
  }

  /**
   * Check if date is before to date2
   * @param  { String }  date date string
   * @param  { String }  date2 date string
   * @return { Boolean }
   */
  static isBefore(date, date2) {
    return moment(date).isBefore(date2);
  }

  /**
   * Check if date is same as date2
   * @param  { String }  date date string
   * @param  { String }  date2 date string
   * @return { Boolean }
   */
  static isSame(date, date2) {
    return moment(date).isSame(date2);
  }

  /**
   * Check if date is after date2
   * @param  { String }  date date string
   * @param  { String }  date2 date string
   * @return { Boolean }
   */
  static isAfter(date, date2) {
    return moment(date).isAfter(date2);
  }

  /**
   * Check if date is between date2
   * @param  { String }  date date string
   * @param  { String }  date2 date string
   * @return { Boolean }
   */
  static isBetween(date, date2) {
    return moment().isBetween(date, date2);
  }

  /**
   * Check if date is a moment date
   * @param  { String }  date date moment
   * @return { Boolean }
   */
  static isMoment(date) {
    return moment.isMoment(date);
  }

  /**
   * Check if date is a javascript date
   * @param  { String }  date javascript date
   * @return { Boolean }
   */
  static isDate(date) {
    return moment.isDate(date);
  }
}

export default Dates;
