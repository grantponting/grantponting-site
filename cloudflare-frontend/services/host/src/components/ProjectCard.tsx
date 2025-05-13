import React, { useState } from 'react';
import { Card, Button, Collapse } from 'react-bootstrap';

export type ProjectCardProps = {
    title: string;
    codeLink?: string;
    tryLink?: string;
    desc: string;
    details?: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ title, codeLink, tryLink, desc, details }) => {
    const [open, setOpen] = useState(false);

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{desc}</Card.Text>
                <Card.Footer>
                    <Card.Link
                        href={codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ cursor: 'pointer' }}
                    >
                        View Code
                    </Card.Link>
                    <Card.Link href={tryLink} style={{ cursor: 'pointer' }}>Try Out</Card.Link>
                    {details && (
                        <>
                            <Card.Link
                                style={{ cursor: 'pointer' }}
                                onClick={() => setOpen(!open)}
                                aria-controls={`details-${title}`}
                                aria-expanded={open}
                            >
                                {open ? 'Hide Details' : 'View More Details'}
                            </Card.Link>
                            <Collapse in={open}>
                                <div id={`details-${title}`} className="mt-3">
                                    <p>{details}</p>
                                </div>
                            </Collapse>
                        </>
                    )}
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};

export default ProjectCard;