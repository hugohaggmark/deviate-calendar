import should from 'should'
import { getDaysInMonthArray, getFillerDaysBeforeThisMonth, getFillerDaysAfterThisMonth } from '../dateHelper'

describe('getFillerDaysBeforeThisMonth', () => {
  it('there should be 0 filler days before May 2017', () => {
    const actual = getFillerDaysBeforeThisMonth(new Date(2017, 4, 1))
    actual.length.should.be.exactly(0)
  })
  it('there should be 1 filler days before November 2016', () => {
    const actual = getFillerDaysBeforeThisMonth(new Date(2016, 10, 9))
    actual.length.should.be.exactly(1)
    actual[0].type.should.be.exactly('other-month-day')
    actual[0].payload.should.be.eql(new Date(2016, 9, 31))
  })
  it('there should be 2 filler days before February 2017', () => {
    const actual = getFillerDaysBeforeThisMonth(new Date(2017, 1, 1))
    actual.length.should.be.exactly(2)
    actual[0].type.should.be.exactly('other-month-day')
    actual[0].payload.should.be.eql(new Date(2017, 0, 30))
    actual[1].type.should.be.exactly('other-month-day')
    actual[1].payload.should.be.eql(new Date(2017, 0, 31))
  })
  it('there should be 3 filler days before December 2016', () => {
    const actual = getFillerDaysBeforeThisMonth(new Date(2016, 11, 1))
    actual.length.should.be.exactly(3)
    actual[0].type.should.be.exactly('other-month-day')
    actual[0].payload.should.be.eql(new Date(2016, 10, 28))
    actual[1].type.should.be.exactly('other-month-day')
    actual[1].payload.should.be.eql(new Date(2016, 10, 29))
    actual[2].type.should.be.exactly('other-month-day')
    actual[2].payload.should.be.eql(new Date(2016, 10, 30))
  })
  it('there should be 4 filler days before September 2017', () => {
    const actual = getFillerDaysBeforeThisMonth(new Date(2017, 8, 1))
    actual.length.should.be.exactly(4)
    actual[0].type.should.be.exactly('other-month-day')
    actual[0].payload.should.be.eql(new Date(2017, 7, 28))
    actual[1].type.should.be.exactly('other-month-day')
    actual[1].payload.should.be.eql(new Date(2017, 7, 29))
    actual[2].type.should.be.exactly('other-month-day')
    actual[2].payload.should.be.eql(new Date(2017, 7, 30))
    actual[3].type.should.be.exactly('other-month-day')
    actual[3].payload.should.be.eql(new Date(2017, 7, 31))
  })
  it('there should be 5 filler days before October 2016', () => {
    const actual = getFillerDaysBeforeThisMonth(new Date(2016, 9, 1))
    actual.length.should.be.exactly(5)
    actual[0].type.should.be.exactly('other-month-day')
    actual[0].payload.should.be.eql(new Date(2016, 8, 26))
    actual[1].type.should.be.exactly('other-month-day')
    actual[1].payload.should.be.eql(new Date(2016, 8, 27))
    actual[2].type.should.be.exactly('other-month-day')
    actual[2].payload.should.be.eql(new Date(2016, 8, 28))
    actual[3].type.should.be.exactly('other-month-day')
    actual[3].payload.should.be.eql(new Date(2016, 8, 29))
    actual[4].type.should.be.exactly('other-month-day')
    actual[4].payload.should.be.eql(new Date(2016, 8, 30))
  })
  it('there should be 6 filler days before January 2017', () => {
    const actual = getFillerDaysBeforeThisMonth(new Date(2017, 0, 1))
    actual.length.should.be.exactly(6)
    actual[0].type.should.be.exactly('other-month-day')
    actual[0].payload.should.be.eql(new Date(2016, 11, 26))
    actual[1].type.should.be.exactly('other-month-day')
    actual[1].payload.should.be.eql(new Date(2016, 11, 27))
    actual[2].type.should.be.exactly('other-month-day')
    actual[2].payload.should.be.eql(new Date(2016, 11, 28))
    actual[3].type.should.be.exactly('other-month-day')
    actual[3].payload.should.be.eql(new Date(2016, 11, 29))
    actual[4].type.should.be.exactly('other-month-day')
    actual[4].payload.should.be.eql(new Date(2016, 11, 30))
    actual[5].type.should.be.exactly('other-month-weekend')
    actual[5].payload.should.be.eql(new Date(2016, 11, 31))
  })
})
describe('getDaysInMonthArray', () =>{
  it('January 2017 should be 31 days', () => {
    const state ={
      date: new Date("2017-01-01"),
      reportedVABDays: [],
      reportedSicknessDays: [],
      reportedVacationDays: [],
      aptitudDays: [],
    }
    const actual = getDaysInMonthArray(state)
    const workDays = actual.filter(day => day.type === 'workday')
    const weekends = actual.filter(day => day.type === 'weekend')
    const days = workDays.length + weekends.length
    days.should.be.exactly(31)
  })
  it('the 1st of January 2017 should be a Sunday', () => {
    const state ={
      date: new Date("2017-01-01"),
      reportedVABDays: [],
      reportedSicknessDays: [],
      reportedVacationDays: [],
      aptitudDays: [],
    }
    const actual = getDaysInMonthArray(state)
    actual[0].type.should.be.exactly('other-month-day')
    actual[1].type.should.be.exactly('other-month-day')
    actual[2].type.should.be.exactly('other-month-day')
    actual[3].type.should.be.exactly('other-month-day')
    actual[4].type.should.be.exactly('other-month-day')
    actual[5].type.should.be.exactly('other-month-weekend')
    actual[6].type.should.be.exactly('weekend')
    actual[6].payload.getDate().should.be.eql(state.date.getDate())
  })
  it('the 1st of October 2016 should be a Saturday', () => {
    const state ={
      date: new Date("2016-10-01"),
      reportedVABDays: [],
      reportedSicknessDays: [],
      reportedVacationDays: [],
      aptitudDays: [],
    }
    const actual = getDaysInMonthArray(state)
    actual[0].type.should.be.exactly('other-month-day')
    actual[1].type.should.be.exactly('other-month-day')
    actual[2].type.should.be.exactly('other-month-day')
    actual[3].type.should.be.exactly('other-month-day')
    actual[4].type.should.be.exactly('other-month-day')
    actual[5].type.should.be.exactly('weekend')
    actual[5].payload.getDate().should.be.eql(state.date.getDate())
  })
})
describe('getFillerDaysAfterThisMonth', () => {
  it('there should be 1 filler days after December 2016', () => {
    const actual = getFillerDaysAfterThisMonth(new Date(2016, 11, 1))
    actual.length.should.be.exactly(1)
    actual[0].type.should.be.exactly('other-month-weekend')
    actual[0].payload.should.be.eql(new Date(2017, 0, 1))
  })
  it('there should be 2 filler days after March 2017', () => {
    const actual = getFillerDaysAfterThisMonth(new Date(2017, 2, 1))
    actual.length.should.be.exactly(2)
    actual[0].type.should.be.exactly('other-month-weekend')
    actual[0].payload.should.be.eql(new Date(2017, 3, 1))
    actual[1].type.should.be.exactly('other-month-weekend')
    actual[1].payload.should.be.eql(new Date(2017, 3, 2))
  })
  it('there should be 3 filler days after August 2017', () => {
    const actual = getFillerDaysAfterThisMonth(new Date(2017, 7, 1))
    actual.length.should.be.exactly(3)
    actual[0].type.should.be.exactly('other-month-day')
    actual[0].payload.should.be.eql(new Date(2017, 8, 1))
    actual[1].type.should.be.exactly('other-month-weekend')
    actual[1].payload.should.be.eql(new Date(2017, 8, 2))
    actual[2].type.should.be.exactly('other-month-weekend')
    actual[2].payload.should.be.eql(new Date(2017, 8, 3))
  })
  it('there should be 4 filler days after November 2016', () => {
    const actual = getFillerDaysAfterThisMonth(new Date(2016, 10, 1))
    actual.length.should.be.exactly(4)
    actual[0].type.should.be.exactly('other-month-day')
    actual[0].payload.should.be.eql(new Date(2016, 11, 1))
    actual[1].type.should.be.exactly('other-month-day')
    actual[1].payload.should.be.eql(new Date(2016, 11, 2))
    actual[2].type.should.be.exactly('other-month-weekend')
    actual[2].payload.should.be.eql(new Date(2016, 11, 3))
    actual[3].type.should.be.exactly('other-month-weekend')
    actual[3].payload.should.be.eql(new Date(2016, 11, 4))
  })
  it('there should be 5 filler days after January 2017', () => {
    const actual = getFillerDaysAfterThisMonth(new Date(2017, 0, 1))
    actual.length.should.be.exactly(5)
    actual[0].type.should.be.exactly('other-month-day')
    actual[0].payload.should.be.eql(new Date(2017, 1, 1))
    actual[1].type.should.be.exactly('other-month-day')
    actual[1].payload.should.be.eql(new Date(2017, 1, 2))
    actual[2].type.should.be.exactly('other-month-day')
    actual[2].payload.should.be.eql(new Date(2017, 1, 3))
    actual[3].type.should.be.exactly('other-month-weekend')
    actual[3].payload.should.be.eql(new Date(2017, 1, 4))
    actual[4].type.should.be.exactly('other-month-weekend')
    actual[4].payload.should.be.eql(new Date(2017, 1, 5))
  })
  it('there should be 6 filler days after July 2017', () => {
    const actual = getFillerDaysAfterThisMonth(new Date(2017, 6, 1))
    actual.length.should.be.exactly(6)
    actual[0].type.should.be.exactly('other-month-day')
    actual[0].payload.should.be.eql(new Date(2017, 7, 1))
    actual[1].type.should.be.exactly('other-month-day')
    actual[1].payload.should.be.eql(new Date(2017, 7, 2))
    actual[2].type.should.be.exactly('other-month-day')
    actual[2].payload.should.be.eql(new Date(2017, 7, 3))
    actual[3].type.should.be.exactly('other-month-day')
    actual[3].payload.should.be.eql(new Date(2017, 7, 4))
    actual[4].type.should.be.exactly('other-month-weekend')
    actual[4].payload.should.be.eql(new Date(2017, 7, 5))
    actual[5].type.should.be.exactly('other-month-weekend')
    actual[5].payload.should.be.eql(new Date(2017, 7, 6))
  })
  it('there should be 7 filler days after May 2017', () => {
    const actual = getFillerDaysAfterThisMonth(new Date(2017, 3, 1))
    actual.length.should.be.exactly(7)
    actual[0].type.should.be.exactly('other-month-day')
    actual[0].payload.should.be.eql(new Date(2017, 4, 1))
    actual[1].type.should.be.exactly('other-month-day')
    actual[1].payload.should.be.eql(new Date(2017, 4, 2))
    actual[2].type.should.be.exactly('other-month-day')
    actual[2].payload.should.be.eql(new Date(2017, 4, 3))
    actual[3].type.should.be.exactly('other-month-day')
    actual[3].payload.should.be.eql(new Date(2017, 4, 4))
    actual[4].type.should.be.exactly('other-month-day')
    actual[4].payload.should.be.eql(new Date(2017, 4, 5))
    actual[5].type.should.be.exactly('other-month-weekend')
    actual[5].payload.should.be.eql(new Date(2017, 4, 6))
    actual[6].type.should.be.exactly('other-month-weekend')
    actual[6].payload.should.be.eql(new Date(2017, 4, 7))
  })
})
