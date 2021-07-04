import React from "react"


const LoaderBox: React.FC<any> = (props: any) => {
  const { styles, params } = props;

  const mergeStyles = Object.assign({
    width: 25,
    height: 25,
    backgroundColor: 'gray'
  }, styles)

  return (
    <div className={'loaderBox'}>
      <div className="_loading"
        style={mergeStyles}
      >

      </div>
    </div>
  )
}

export default LoaderBox