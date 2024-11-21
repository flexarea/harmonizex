import PropTypes from 'prop-types';

const userShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  gender: PropTypes.string.isRequired,
  preferences: PropTypes.shape({
    prefer_men: PropTypes.bool.isRequired,
    prefer_women: PropTypes.bool.isRequired,
    prefer_enby: PropTypes.bool.isRequired,
  }).isRequired,
  spotify: PropTypes.arrayOf(PropTypes.string).isRequired,
  updated: PropTypes.string.isRequired,
});

export default userShape;
