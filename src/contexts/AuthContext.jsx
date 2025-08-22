import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, userType) => {
    // Dummy authentication - in real app, this would be API call
    const dummyUsers = {
      'admin@tailorconnect.ae': { 
        id: 1, 
        email: 'admin@tailorconnect.ae', 
        name: 'Admin User', 
        type: 'admin',
        avatar: '/placeholder.svg' 
      },
      'tailor@tailorconnect.ae': { 
        id: 2, 
        email: 'tailor@tailorconnect.ae', 
        name: 'Master Tailor', 
        type: 'tailor',
        avatar: '/placeholder.svg',
        businessName: 'Elite Tailoring',
        specialization: 'Traditional & Modern'
      },
      'customer@tailorconnect.ae': { 
        id: 3, 
        email: 'customer@tailorconnect.ae', 
        name: 'Customer User', 
        type: 'customer',
        avatar: '/placeholder.svg' 
      }
    };

    const userData = dummyUsers[email];
    if (userData && password === 'password123') {
      const userWithType = { ...userData, type: userType || userData.type };
      setUser(userWithType);
      localStorage.setItem('user', JSON.stringify(userWithType));
      return { success: true, user: userWithType };
    }
    
    return { success: false, error: 'Invalid credentials' };
  };

  const register = async (userData) => {
    // Dummy registration
    const newUser = {
      id: Date.now(),
      ...userData,
      avatar: '/placeholder.svg'
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};