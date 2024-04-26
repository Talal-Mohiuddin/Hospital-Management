import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
      <div className="banner">
        <img src={imageUrl} alt="" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who Are We</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quos, ea maxime culpa soluta doloribus voluptatem tempora, deserunt a consequuntur illo perferendis? Vero qui perferendis non? Sapiente, animi voluptate ad iure molestiae temporibus, eveniet provident voluptatem ratione asperiores at ab quibusdam non minus? Quam, saepe! Quod alias eum in molestiae!</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quae vitae eaque labore eveniet voluptatibus. Molestiae assumenda corporis cumque vero, provident qui ipsa culpa pariatur voluptas odio dicta blanditiis cum facilis quam consectetur at ducimus!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit explicabo possimus adipisci.</p>
        <p>Lorem, ipsum dolor.</p>
      </div>
    </div>
  )
}

export default Biography