// This code was written w/the help of Open Ai's ChatGPT 3.5
// import the Post model from the "../models" directory
const { Post } = require('../models');

const posts = [
  {
    title: 'Introduction to JavaScript',
    content: 'In the expansive realm of web development, JavaScript stands out as a cornerstone language, empowering developers to craft dynamic and interactive web pages. As a versatile and high-level programming language, JavaScript plays a pivotal role in shaping the user experience by enabling real-time updates and responsive interfaces. This introductory blog post aims to unravel the essence of JavaScript, delving into its fundamental concepts, syntax, and the crucial role it plays in web development. From basic scripting to advanced front-end frameworks, embark on a journey to discover the power and potential of JavaScript, a language that continues to evolve and redefine the digital landscape. Whether you are a coding novice or a seasoned developer, understanding JavaScript is not just a skill but a gateway to unlocking the dynamic capabilities of the modern web.',
    user_id: 1,
  },
  {
    title: 'React.js Fundamentals',
    content: 'Embarking on the React.js journey opens up a world of possibilities in building robust, scalable, and efficient web applications. This blog post serves as a compass for navigating the fundamental landscape of React.js, a JavaScript library that has revolutionized the way developers approach front-end development. Dive into the core concepts, such as components, state, and props, as React.js empowers you to create modular, reusable UI elements. Uncover the magic of virtual DOM, discover the simplicity of JSX syntax, and explore the ecosystem of React.js, which includes powerful libraries and tools. Whether you are venturing into the realm of single-page applications or honing your skills in component-based architecture, this post unravels the key fundamentals of React.js, paving the way for an exciting and efficient journey in modern web development.',
    user_id: 2,
  },
  {
    title: 'Node.js Backend Development',
    content: 'Welcome to the dynamic realm of Node.js backend development, where the server-side landscape is transformed by JavaScript. In this insightful blog post, we delve into the core principles of Node.js, the runtime environment that enables JavaScript to run server-side applications. Explore the event-driven, non-blocking architecture that underlies Node.js, allowing for high concurrency and optimal scalability. From creating robust APIs to managing databases and handling real-time applications, Node.js proves its versatility in the world of backend development. Join us on a journey through the foundations of Node.js, where efficiency, speed, and a vibrant ecosystem converge to empower developers in crafting powerful and scalable server-side solutions.',
    user_id: 3,
  },
  {
    title: 'Python for Data Science',
    content: 'Embark on a data-driven voyage with our blog post, "Python for Data Science." In this exploration, we unravel the potential of Python as a powerhouse for data analysis and machine learning. From its versatile libraries like NumPy and Pandas to the extensive capabilities offered by frameworks such as TensorFlow and Scikit-learn, Python emerges as a preferred language for data scientists. Discover the ease of manipulating and visualizing data, building predictive models, and gaining valuable insights from complex datasets. Whether you are a seasoned data scientist or a curious beginner, this post navigates through the essential tools and concepts that make Python a compelling choice for unraveling the mysteries hidden within data.',
    user_id: 3,
  },
  {
    title: 'The Rise of Quantum Computing in Modern Technology',
    content: 'In the ever-evolving landscape of technology, quantum computing emerges as a groundbreaking paradigm shift, promising to revolutionize computation as we know it. Quantum computers harness the principles of quantum mechanics, leveraging quantum bits or qubits to perform complex calculations at speeds unimaginable with classical computers. The potential applications of quantum computing span diverse fields, from cryptography and optimization problems to drug discovery and artificial intelligence. As research advances and companies invest in quantum technologies, the once theoretical concept of quantum computing is edging closer to practical implementation. The rise of quantum computing heralds a new era in problem-solving capabilities, offering solutions to challenges deemed insurmountable by classical computing methods. As we embark on this quantum frontier, the transformative impact on industries and scientific discovery is poised to reshape the technological landscape in ways we are only beginning to fathom.',
    user_id: 3,
  },
  {
    title: 'the Power of Progressive Web Apps (PWAs)',
    content: 'In the digital realm, where seamless user experiences and accessibility reign supreme, Progressive Web Apps (PWAs) emerge as the trailblazers of a new era. These innovative applications combine the best of both worlds, seamlessly blending the reach of the web with the performance and engagement of native apps. PWAs bring forth a user-centric paradigm, ensuring a reliable and fast experience, regardless of the network conditions. With features like offline functionality, push notifications, and responsive design, PWAs transcend traditional app limitations, offering a dynamic and engaging experience for users across devices. As businesses embrace the PWA revolution, this blog post delves into the key principles, benefits, and real-world applications that position PWAs at the forefront of modern web development. Join us in unlocking the potential of PWAs and reshaping the landscape of user interaction.',
    user_id: 3,
  },
];

// define a function that inserts multiple records into the 'posts' table based on the data in the 'posts' array above
const seedPostData = () => Post.bulkCreate(posts);

module.exports = seedPostData;