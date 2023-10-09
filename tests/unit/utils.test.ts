import { isMemberPropValid, removeFormKeys } from '../../src/utils'

describe('#utils', () => {
  describe('#isMemberPropValid', () => {
    test.each(['1', 'foobar', [], ['foo', 'bar'], [1, 2, 3]])(
      '%p should return truthy',
      (value) => {
        expect(isMemberPropValid(value as string)).toBeTruthy()
      }
    )

    test.each(['', 1, null, undefined, true, false, {}, { foo: 1 }])(
      '%p should return falsy',
      (value) => {
        expect(isMemberPropValid(value as string)).toBeFalsy()
      }
    )
  })

  describe('#removeFormKeys', () => {
    it('should remove unwanted keys from the form object', () => {
      expect(
        removeFormKeys({
          id: 'foo',
          title: 'foobar',
          items: [
            { id: 1, title: 'one' },
            {
              id: 2,
              title: 'two',
              application: { id: 'a', installation_id: 'b', value: 'c' },
            },
            {
              id: 3,
              title: 'three',
              values: ['foo', 'bar'],
              settings: { id: 33, value: false },
              integrations: [5, 6, 7],
            },
          ],
          integrations: { foo: 'bar' },
          application: { id: 11, installation_id: 22 },
          settings: { id: 'bar', enabled: true },
          links: [
            'http://example.com',
            'http://localhost',
            { id: 'foo', url: 'http://foo' },
          ],
        })
      ).toEqual({
        title: 'foobar',
        items: [
          { title: 'one' },
          { title: 'two', application: { id: 'a', value: 'c' } },
          {
            title: 'three',
            values: ['foo', 'bar'],
            settings: { value: false },
          },
        ],
        application: { id: 11 },
        settings: { enabled: true },
        links: [
          'http://example.com',
          'http://localhost',
          { url: 'http://foo' },
        ],
      })
    })
  })
})
