import { useLocation, useNavigate } from 'react-router';
import { useTheme } from '../../hooks/use-theme';
import { UseUser } from '../../hooks/use-user';
import {
  BottomContainer,
  Container,
  LinksContainer,
  StyledCircleHalfTiltIcon,
  StyledClockCounterClockwiseIcon,
  StyledLink,
  StyledListChecksIcon,
  StyledSignOutIcon,
} from './styles';

export const SideBar = () => {
  const { userData, logout } = UseUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/entrar');
  };

  const avatarColors = [
    '#4f46e5',
    '#0891b2',
    '#059669',
    '#d97706',
    '#dc2626',
    '#7c3aed',
    '#db2777',
  ];

  const getAvatarColor = (name: string) => {
    const index = name.charCodeAt(0) % avatarColors.length;
    return avatarColors[index];
  };

  return (
    <Container>
      {userData.user?.avatarUrl ? (
        <img src={userData.user.avatarUrl} alt={userData.user.name} />
      ) : (
        <div
          style={{
            backgroundColor: getAvatarColor(userData.user?.name ?? 'U'),
            borderRadius: '50%',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          {(userData.user?.name ?? 'U')[0].toUpperCase()}
        </div>
      )}
      <LinksContainer>
        <StyledLink to="/" $active={pathname === '/'}>
          <StyledListChecksIcon />
        </StyledLink>
        <StyledLink to="/foco" $active={pathname === '/foco'}>
          <StyledClockCounterClockwiseIcon />
        </StyledLink>
      </LinksContainer>
      <BottomContainer>
        <StyledCircleHalfTiltIcon onClick={toggleTheme} />
        <StyledSignOutIcon onClick={handleLogout} />
      </BottomContainer>
    </Container>
  );
};
