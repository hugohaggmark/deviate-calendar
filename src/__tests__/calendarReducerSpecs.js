import should from 'should'
import { reducer as CalendarReducer } from '../Calendar'
import { constants as types } from '../Calendar'
import { updateDateForArrayProperty } from '../Calendar/reducer'

describe('Calendar Reducer', () => {
  describe('updateDateForArrayProperty', () => {
    describe('Adding an array property to an initial state', () => {
      it('should contain the new property', () => {
        const state = CalendarReducer()
        const payload = {
          date: new Date(2016, 0, 1),
          type: 'kalle',
        }
        const newState = updateDateForArrayProperty(payload, state)
        newState.kalle.length.should.be.exactly(1)
        newState.kalle[0].getDate().should.be.eql(payload.date.getDate())
      })
    })
    describe('Adding a value to an existing array', () => {
      it('should contain the new value', () => {
        const state = CalendarReducer()
        const payload = {
          date: new Date(2016, 0, 1),
          type: 'reportedVABDays',
        }
        const payload2 = {
          date: new Date(2016, 0, 2),
          type: 'reportedVABDays',
        }
        let newState = updateDateForArrayProperty(payload, state)
        newState = updateDateForArrayProperty(payload2, newState)
        newState.reportedVABDays.length.should.be.exactly(2)
        newState.reportedVABDays[1].getDate().should.be.eql(payload2.date.getDate())
      })
    })
    describe('Removing a value from an existing array', () => {
      it('should contain the new value', () => {
        const state = CalendarReducer()
        const payload = {
          date: new Date(2016, 0, 1),
          type: 'reportedVABDays',
        }
        let newState = updateDateForArrayProperty(payload, state)
        newState = updateDateForArrayProperty(payload, newState, true)
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
    it('should contain workHours', () => {
      const state = CalendarReducer()
      should.exist(state.workHours)
      state.workHours.should.be.exactly(0)
    })
  })
})
