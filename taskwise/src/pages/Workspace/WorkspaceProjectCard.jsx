import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProjectIconBlack from '../../assets/Projects.png';
import WorkspaceMembers from './WorkspaceMembers';

function WorkspaceProjectCard({ projectData, membersData }) {
  const navigate = useNavigate();
  if (!Array.isArray(projectData)) {
      console.error("projectData is not an array", projectData);
      return null;
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={9}>
        <Grid container spacing={3}>
          {projectData && projectData.map((project) => (
            <Grid item key={project.id} xs={12} sm={6} md={4} lg={4} xl={3}>
              <Card
                sx={{
                  width: '100%',
                  maxWidth: 240,
                  borderRadius: 2,
                }}
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                <CardMedia
                  component="img"
                  alt="project thumbnail"
                  height="100"
                  image={project.imgUrl}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Grid container alignItems="center" spacing={0.2}>
                    <Grid item>
                      <img
                        src={ProjectIconBlack}
                        alt="Projects"
                        style={{ padding: "10px", width: "24px", height: "24px" }}
                      />
                    </Grid>
                    <Grid item sx={{ paddingTop: 2 }}>
                      <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1rem' }}>
                        {project.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} md={3}>
        <WorkspaceMembers height="365px" width="90%" membersData={membersData} />
      </Grid>
    </Grid>
  );
}

WorkspaceProjectCard.propTypes = {
  projectData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    imgUrl: PropTypes.string,
  })).isRequired,
};

export default WorkspaceProjectCard;
