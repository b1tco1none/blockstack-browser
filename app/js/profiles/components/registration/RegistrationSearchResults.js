import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import roundTo from 'round-to'


const nameResultStyle = {
  marginBottom: '3em'
}

const availabilityHeaderStyle = {
  marginTop: '1em',
  marginBottom: '0.5em'
}

const RegistrationSearchResults = (props) =>
  (
  <div>
    <a
      href=""
      className="pull-left"
      onClick={props.showSearchBox}
    >
      &lt; Back
    </a>
    <br />
    <h3 className="modal-heading">Available names</h3>
    <div className="modal-body">
      {props.searchingUsername ?
        props.nameSuffixes.map((nameSuffix) => {
          const name = `${props.searchingUsername}.${nameSuffix}`
          const nameAvailabilityObject = props.availableNames[name]
          const searching = !nameAvailabilityObject ||
          nameAvailabilityObject.checkingAvailability
          const isSubdomain = nameSuffix.split('.').length > 1

          const available = nameAvailabilityObject &&
            nameAvailabilityObject.available
          const checkingPrice = nameAvailabilityObject &&
            nameAvailabilityObject.checkingPrice
          let price = 0
          if (nameAvailabilityObject) {
            price = nameAvailabilityObject.price
          }
          price = roundTo.up(price, 6)
          return (
            <div key={nameSuffix}>
            {searching ?
              <h4>Checking {name}...</h4>
              :
              <div>
                {available ?
                  <div style={nameResultStyle}>
                    <h4 style={availabilityHeaderStyle}>{name}</h4>
                    {isSubdomain ?
                      <Link
                        className="btn btn-primary btn-sm"
                        to={`/profiles/i/add-username/${props.ownerAddress}/select/${name}`}
                      >
                        Get <strong>{name}</strong> for free
                      </Link>
                    :
                      <div>
                      {checkingPrice ?
                        <div className="progress">
                          <div
                            className="progress-bar progress-bar-striped progress-bar-animated"
                            role="progressbar"
                            aria-valuenow="100"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: '100%' }}
                          >
                          Checking price...
                          </div>
                        </div>
                        :
                        <Link
                          className="btn btn-primary btn-sm"
                          to={`/profiles/i/add-username/${props.ownerAddress}/select/${name}`}
                        >
                          Buy <strong>{name}</strong> for {price} bitcoins
                        </Link>
                      }
                      </div>
                    }
                  </div>
                  :
                  <div>
                    <h4 style={availabilityHeaderStyle}>{name}</h4>
                    <button
                      className="btn btn-primary btn-sm"
                      disabled
                    >
                      {name} is already taken
                    </button>
                  </div>

                }
              </div>
            }
            </div>
          )
        })
        :
        null
      }
    </div>
  </div>
 )

RegistrationSearchResults.propTypes = {
  showSearchBox: PropTypes.func.isRequired,
  searchingUsername: PropTypes.string,
  nameSuffixes: PropTypes.array.isRequired,
  availableNames: PropTypes.object.isRequired,
  ownerAddress: PropTypes.string.isRequired
}

export default RegistrationSearchResults
