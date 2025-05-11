
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Node component for displaying animal classification
const Node = ({ label, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ marginLeft: '20px', cursor: 'pointer' }}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    color: 'green',
                    fontWeight: 'bold',
                    transition: '0.3s',
                    padding: '5px',
                    borderRadius: '5px',
                    display: 'inline-block',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
            >
                {isOpen ? '▼ ' : '▶ '} {label}
                <span style={{ color: 'gray', fontSize: '12px', marginLeft: '5px' }}>
                    (Click Here)
                </span>
            </div>
            {isOpen && <div style={{ marginLeft: '15px' }}>{children}</div>}
        </div>
    );
};

const AnimalClassification = () => {
    return (
        <div
            style={{
                backgroundColor: '#4CAF50', // Green background for Animal Kingdom
                padding: '20px',
                borderRadius: '10px',
                maxWidth: '500px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                margin: '20px auto', // Centered on page
            }}
        >
            <h2
                style={{
                    color: 'white',
                    textAlign: 'center',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                }}
            >
                🌿 Animal Kingdom 🌿
            </h2>
            <Node label="Animalia (Multicellular) 🦁">
                <Node label="Cellular Level 🔬">
                    <span>➡ Porifera (Sponges) 🧽</span>
                </Node>
                <Node label="Tissue/Organ System 🧬">
                    <Node label="Radial Symmetry 🎡">
                        <Node label="Coelenterata (Cnidaria) 🦑" />
                        <Node label="Ctenophora (Comb Jellies) 🌊" />
                    </Node>
                    <Node label="Bilateral Symmetry ⚖">
                        <Node label="Acoelomates (No Body Cavity) 🚫">
                            <span>➡ Platyhelminthes (Flatworms) 🪱</span>
                        </Node>
                        <Node label="Pseudocoelomates (Body Cavity) 🌀">
                            <span>➡ Nematoda (Roundworms) 🪱</span>
                        </Node>
                        <Node label="Coelomates (True Body Cavity) 🏛">
                            <Node label="Annelida (Segmented Worms) 🐍" />
                            <Node label="Arthropoda (Insects, Arachnids) 🦋" />
                            <Node label="Mollusca (Mollusks) 🐚" />
                            <Node label="Echinodermata (Starfish, Sea Urchins) 🌟" />
                            <Node label="Chordata (Vertebrates) 🦓" />
                        </Node>
                    </Node>
                </Node>
            </Node>
        </div>
    );
};

// Main AnimaliaPage component
export default function AnimaliaPage() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [selectedAnimal, setSelectedAnimal] = useState(null);

    useEffect(() => {
        fetch(
            'https://zoolight.s3.ap-south-1.amazonaws.com/Zoolight+database.json'
        )
            .then((response) => response.json())
            .then((json) => {
                setData(json);
                setFilteredData(json);
            })
            .catch((error) => console.error('Failed to fetch data:', error));
    }, []);

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            setFilteredData(data);
        } else {
            const found = data.filter((item) =>
                item['Common Name']?.toLowerCase().includes(searchTerm.toLowerCase().trim())
            );
            setFilteredData(found);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSelectAnimal = (animal) => {
        setSelectedAnimal(animal);
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif' }}>
            {/* Fullscreen Image Section (First Screenshot) */}
            <div
                style={{
                    height: '100vh',
                    width: '100%',
                    backgroundImage: `url('https://zoolight.s3.ap-south-1.amazonaws.com/Screenshot+2025-02-02+210830.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            ></div>

            {/* Scroll Down to Search and Animals Section */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundColor: '#f8f8f8',
                    padding: '20px',
                }}
            >
                <div
                    style={{
                        width: '90%',
                        maxWidth: '1200px',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                    }}
                >
                    Search Bar
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                            style={{
                                flex: 1,
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                outline: 'none',
                            }}
                        />
                        <button
                            onClick={handleSearch}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#004d26',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Search
                        </button>
                    </div>

                    {/* Back Button */}
                    {selectedAnimal && (
                        <button
                            onClick={() => setSelectedAnimal(null)}
                            style={{
                                marginBottom: '20px',
                                backgroundColor: '#e74c3c',
                                color: '#fff',
                                padding: '10px',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                                width: '150px',
                            }}
                        >
                            ⬅ Back to Results
                        </button>
                    )}

                    {/* Display Search Results */}
                    {!selectedAnimal && (
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '20px',
                                justifyContent: 'center',
                                maxHeight: '500px',
                                overflowY: 'auto',
                                padding: '10px',
                            }}
                        >
                            {filteredData.length > 0 ? (
                                filteredData.map((animal, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => handleSelectAnimal(animal)}
                                        style={{
                                            cursor: 'pointer',
                                            maxWidth: '300px',
                                            width: '100%',
                                            borderRadius: '10px',
                                            backgroundColor: '#f0f0f0',
                                            padding: '15px',
                                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        <img
                                            src={animal.image}
                                            onError={(e) =>
                                            (e.target.src =
                                                'https://via.placeholder.com/150?text=No+Image')
                                            }
                                            alt={animal['Common Name']}
                                            style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                                        />
                                        <h3
                                            style={{
                                                fontSize: '18px',
                                                marginTop: '10px',
                                                fontWeight: 'bold',
                                                color: '#1b5e20',
                                            }}
                                        >
                                            {animal['Common Name']}
                                        </h3>
                                    </motion.div>
                                ))
                            ) : (
                                <p style={{ textAlign: 'center', color: '#999' }}>No animals found.</p>
                            )}
                        </div>
                    )}

                    Display Animal Details

                    {selectedAnimal && (
                        <div
                            style={{
                                display: "flex",
                                marginTop: "30px",
                                flexDirection: "row",
                                gap: "20px",
                            }}
                        >
                            {/* Left: Animal Info */}
                            <div style={{ flex: 1, padding: "20px" }}>
                                <h2
                                    style={{
                                        fontStyle: "italic",
                                        fontWeight: "bold",
                                        color: "#1b5e20",
                                        fontSize: "28px",
                                    }}
                                >
                                    {selectedAnimal["Common Name"] || "Animal"}
                                </h2>
                                <p
                                    style={{
                                        fontWeight: "bold",
                                        color: "#1b5e20",
                                        lineHeight: "1.6",
                                    }}
                                >
                                    Kingdom:{" "}
                                    <span style={{ fontStyle: "italic" }}>
                                        {selectedAnimal["Kingdom"] || "N/A"}
                                    </span>
                                    . Phylum:{" "}
                                    <span style={{ fontStyle: "italic" }}>
                                        {selectedAnimal["Phylum"] || "N/A"}
                                    </span>
                                    . Class:{" "}
                                    <span style={{ fontStyle: "italic" }}>
                                        {selectedAnimal["Class"] || "N/A"}
                                    </span>
                                    . Order:{" "}
                                    <span style={{ fontStyle: "italic" }}>
                                        {selectedAnimal["Order"] || "N/A"}
                                    </span>
                                    . Family:{" "}
                                    <span style={{ fontStyle: "italic" }}>
                                        {selectedAnimal["Family"] || "N/A"}
                                    </span>
                                    . Genus:{" "}
                                    <span style={{ fontStyle: "italic" }}>
                                        {selectedAnimal["Genus"] || "N/A"}
                                    </span>
                                    . Species:{" "}
                                    <span style={{ fontStyle: "italic" }}>
                                        {selectedAnimal["Species"] || "N/A"}
                                    </span>
                                    .
                                </p>
                                <p style={{ fontStyle: "italic", color: "#333", marginTop: "10px" }}>
                                    Habitat: {selectedAnimal["Habitat"] || "N/A"}. Diet: {selectedAnimal["Diet"] || "N/A"}.
                                </p>
                                <div style={{ marginTop: "15px" }}>
                                    <button
                                        onClick={() =>
                                            window.open(
                                                `https://www.google.com/search?q=${selectedAnimal["Common Name"]}`,
                                                "_blank"
                                            )
                                        }
                                        style={{
                                            padding: "10px 15px",
                                            marginRight: "10px",
                                            backgroundColor: "#004d26",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Learn More
                                    </button>
                                    <button
                                        style={{
                                            padding: "10px 15px",
                                            backgroundColor: "#ccc",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Contact
                                    </button>
                                </div>
                            </div>

                            {/* Right: Image */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1 }}
                                style={{
                                    flex: 1,
                                    position: "relative",
                                    backgroundColor: "#004d26",
                                    borderRadius: "10px",
                                    overflow: "hidden",
                                }}
                            >
                                <img
                                    src={selectedAnimal.image}
                                    onError={(e) =>
                                    (e.target.src =
                                        "https://via.placeholder.com/400x300?text=No+Image")
                                    }
                                    alt={selectedAnimal["Common Name"]}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                    }}
                                />
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
            );



            {/* Animal Classification Section */}
            <AnimalClassification />

            {/* Fullscreen Image Section (Second Screenshot) */}
            <div
                style={{
                    height: '100vh',
                    width: '100%',
                    backgroundImage: `url('https://zoolight.s3.ap-south-1.amazonaws.com/Screenshot+2025-02-03+140303.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            ></div>
        </div>
    );
}


