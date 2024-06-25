![Poemic image](./public/215_1x_shots_so.webp)

# Poemic

**A place where images speak and words are heard. Add your images and let it tell you its verse with Poemic.**

## Overview

Poemic is a web application that allows users to upload images and generate poetry based on the visual content of those images. Leveraging the power of the cutting-edge Gemini AI, Poemic creates unique, inspiring verses that can be further edited and downloaded by the user.

## Features

- **Image Upload:** Users can upload their images.
- **Poem Generation:** The Gemini AI generates poems based on the uploaded images.
- **Editing:** Users can edit the title of the generated poems.
- **Download:** Download the final poem in a beautifully formatted manner.

## Tech Stack

- **Next.js:** React framework for server-side rendering and generating static websites.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **TypeScript:** JavaScript with static typing.
- **Gemini AI:** AI service used for generating poems from images.

## Setup Instructions

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (>=14.0.0)
- npm or yarn
- Gemini AI API Key

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/subhadeeproy3902/poemic.git
    cd poemic
    ```

2. **Install dependencies:**

    Using npm:

    ```bash
    npm install
    ```

    Or using yarn:

    ```bash
    yarn install
    ```

3. **Set up environment variables:**

    Create a `.env.local` file in the root of your project and add the following environment variable:

    ```plaintext
    NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
    ```

    Replace `your-gemini-api-key` with your actual Gemini AI API key.

### Running the Application

To start the development server, run:

Using npm:

```
npm run dev
```

or using yarn: 

```
yarn dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

To build the application for production, run:

Using npm:

```
npm run build
```

or using yarn:

```
yarn build
```

To start the production server, run:

Using npm:

```
npm start
```

or using yarn:

```
yarn start
```

## Contributing

To contribute to Poemic, follow these steps:

1. Fork the repository.

2. Create a new branch: `git checkout -b feature-branch-name`.

3. Make your changes and commit them: `git commit -m 'Add some feature'`.

4. Push to the branch: `git push origin feature-branch-name`.

5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE.md](https://github.com/subhadeeproy3902/poemic/blob/main/LICENSE) file for details.

# Contact

If you have any questions or suggestions, feel free to contact me at subha9.5roy350@gmail.com