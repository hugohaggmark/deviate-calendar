import should from 'should'
import { reducer as CalendarReducer } from '../Calendar'
import { constants as types } from '../Calendar'
import { updateDateForArrayProperty } from '../Calendar/reducer'

describe('Calendar Reducer', () => {
  describe('Aptitud related days', () => {
    describe('when reporting a date as Aptitud related', () => {
      it('should be added to Aptitud related days', () => {
        const date = new Date()
        const state = new CalendarReducer(
          {aptitudDays:[]}
          , {type: types.REPORT_APTITUDDAY, payload:{date:date}})
          state.aptitudDays.length.should.be.exactly(1)
          state.aptitudDays[0].should.be.exactly(date)
      })
    })
    describe('when clearing a date as Aptitud related', () => {
      it('should be removed from Aptitud related days', () => {
        const date = new Date()
        const state = new CalendarReducer(
          {aptitudDays:[date]}
          , {type: types.CLEAR_APTITUDDAY, payload:{date:date}})
          state.aptitudDays.length.should.be.exactly(0)
      })
    })
  })
  describe('updateDateForArrayProperty', () => {
    describe('Adding an array property to an initial state', () => {
      it('should contain the new property', () => {
        const state = CalendarReducer()
        const date = new Date(2016, 0, 1)
        const newState = updateDateForArrayProperty(date, state, 'kalle')
        newState.kalle.length.should.be.exactly(1)
        newState.kalle[0].getDate().should.be.eql(date.getDate())
      })
    })
    describe('Adding a value to an existing array', () => {
      it('should contain the new value', () => {
        const state = CalendarReducer()
        const date = new Date(2016, 0, 1)
        const newState = updateDateForArrayProperty(date, state, 'reportedVABDays')
        newState.reportedVABDays.length.should.be.exactly(1)
        newState.reportedVABDays[0].getDate().should.be.eql(date.getDate())
      })
    })
    describe('Removing a value from an existing array', () => {
      it('should contain the new value', () => {
        const state = CalendarReducer()
        const date = new Date(2016, 0, 1)
        let newState = updateDateForArrayProperty(date, state, 'reportedVABDays')
        newState = updateDateForArrayProperty(date, newState, 'reportedVABDays', true)
        newState.reportedVABDays.length.should.be.exactly(0)
      })
    })
  })
  describe('An initial calendar reducer', () => {
    it('should contain weekdays', () => {
      const state = CalendarReducer()
      state.weekdays.length.should.be.exactly(7)
      state.weekdays[0].should.be.exactly('Mån');
      state.weekdays[1].should.be.exactly('Tis');
      state.weekdays[2].should.be.exactly('Ons');
      state.weekdays[3].should.be.exactly('Tor');
      state.weekdays[4].should.be.exactly('Fre');
      state.weekdays[5].should.be.exactly('Lör');
      state.weekdays[6].should.be.exactly('Sön');
    })
    it('should contain months', () => {
      const state = CalendarReducer()
      state.months.length.should.be.exactly(12)
      state.months[0].should.be.exactly('Januari');
      state.months[1].should.be.exactly('Februari');
      state.months[2].should.be.exactly('Mars');
      state.months[3].should.be.exactly('April');
      state.months[4].should.be.exactly('Maj');
      state.months[5].should.be.exactly('Juni');
      state.months[6].should.be.exactly('Juli');
      state.months[7].should.be.exactly('Augusti');
      state.months[8].should.be.exactly('September');
      state.months[9].should.be.exactly('Oktober');
      state.months[10].should.be.exactly('November');
      state.months[11].should.be.exactly('December');
    })
    it('should contain reported VAB days', () => {
      const state = CalendarReducer()
      state.reportedVABDays.length.should.be.exactly(0)
    })
    it('should contain reported Sickness days', () => {
      const state = CalendarReducer()
      state.reportedSicknessDays.length.should.be.exactly(0)
    })
    it('should contain reported Vacation days', () => {
      const state = CalendarReducer()
      state.reportedVacationDays.length.should.be.exactly(0)
    })
    it('should contain holiday days', () => {
      const state = CalendarReducer()
      should.exist(state.holidays)
    })
    it('should contain Aptitud related days', () => {
      const state = CalendarReducer()
      should.exist(state.aptitudDays)
    })
    it('should contain workHours', () => {
      const state = CalendarReducer()
      should.exist(state.workHours)
      state.workHours.should.be.exactly(0)
    })
  })
})
