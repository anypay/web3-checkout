import React from 'react'
import './styles.css'
import styled from 'styled-components'


type IPreloaderTemplate = {
  active: boolean;
}

type IWrapperStyled = {
  readonly active?: boolean;
};

const WrapperStyled = styled.div<IWrapperStyled>`
  position: fixed;
  z-index: 99999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  left: 0;
  top: 0;

  ${props => !props.active && 'display: none;' }
`

const ComponentStyled = styled.div`
`

function PreloaderTemplate({ active } : IPreloaderTemplate) {
  return (
    <WrapperStyled active = {active}>
      <ComponentStyled>
        <div className='preloader'>

          <svg
            id="preloader-logo"
            viewBox="0 0 41.5 48.299998"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g 
              id="preloader-logo-yellow-container"
              transform="translate(-76.675855,-9.7603868)"
            >
              <g id="preloader-logo-yellow">

                <path
                  d="m 107.46253,19.301522 10.69409,10.781031 -17.09237,16.902655 z"
                  id="path304"
                  fill="#f5c867"
                />

                <path
                  d="m 107.46178,19.305968 c 0,0.153696 -2.56409,23.905096 -2.56409,23.905096 l -3.92807,3.843534 z"
                  id="path456"
                  fill="#cea012"
                />

              </g>
            </g>

            <g 
              id="preloader-logo-red-container"
              transform="translate(-76.675855,-9.7603868)"
            >
              <g id="preloader-logo-red">

                <path
                  d="M 100.83415,47.189837 90.160712,57.991509 76.684426,36.244695 Z"
                  id="path302"
                  fill="#e9574f"
                />

                <path
                  d="M 96.773517,51.295694 100.83738,47.183931 76.679552,36.24322 Z"
                  id="path2638"
                  fill="#c74a43"
                />

              </g>
            </g>
                
            <path
              d="m 28.251655,41.496063 10.51789,-10.593897 -2.93496,15.39389 z"
              id="preloader-logo-pink"
              fill="#8d5ca7"
            />

            <path
              d="M 7.046322,20.243959 24.118165,3.1019592 19.324018,27.984752 Z"
              id="preloader-logo-blue"
              fill="#0077c0"
            />
          
            <path
              d="M 9.437549,9.6325236 16.020733,2.9674892 11.207626,0.00188435 Z"
              id="preloader-logo-green"
              fill="#069354"
            />

          </svg>

          <div className='preloader__background'></div>
          <div className='preloader__borders'></div>
          
        </div>

      </ComponentStyled>
    </WrapperStyled>
  )
}

export default PreloaderTemplate
