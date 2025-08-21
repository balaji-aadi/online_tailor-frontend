import { ArrowRight, Scissors, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-white mb-16">
          <h1 className="text-6xl font-bold mb-6">UAE Tailor Platform</h1>
          <p className="text-xl mb-8 opacity-90">Professional tailoring services connecting customers with expert tailors across the UAE</p>
          <div className="flex justify-center space-x-4">
            <Link to="/admin">
              <Button size="lg" className="btn-gold hover-lift">
                <Users className="w-5 h-5 mr-2" />
                Admin Portal
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/tailor">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20 hover-lift">
                <Scissors className="w-5 h-5 mr-2" />
                Tailor Portal
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="card-premium hover-lift bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8 text-center text-white">
              <div className="w-16 h-16 bg-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                <Scissors className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Tailors</h3>
              <p className="opacity-90">Connect with verified professional tailors specializing in traditional and modern designs</p>
            </CardContent>
          </Card>

          <Card className="card-premium hover-lift bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8 text-center text-white">
              <div className="w-16 h-16 bg-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
              <p className="opacity-90">Traditional Emirati garments crafted with attention to authentic details and comfort</p>
            </CardContent>
          </Card>

          <Card className="card-premium hover-lift bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8 text-center text-white">
              <div className="w-16 h-16 bg-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">UAE Focused</h3>
              <p className="opacity-90">Built for the UAE market with Arabic/English support and cultural authenticity</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
