import React from 'react';
import { Activity, Search, Filter, Download, ArrowLeft, Upload, FileText } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';


const DocumentsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header avec navigation */}
      <header className="h-16 bg-light-gray-1 border-b border-border flex items-center justify-between px-6 header">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="border-border hover:bg-green-pastel"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Exporter
          </Button>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Bandeau de titre */}
        <div className="bg-gradient-to-r from-orange-600 via-orange-600/80 to-orange-600 border border-border/30 rounded-2xl p-6 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-chart-2/5 opacity-50"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl md:rounded-3xl flex items-center justify-center flex-shrink-0">
              <Activity className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <div className="flex-1 min-w-0 space-y-2 md:space-y-3">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                Gestion des Documents
              </h2>
              <p className="text-orange-100 text-base md:text-lg leading-relaxed">
                Gérez vos documents et pièces justificatives
              </p>
            </div>
            <div className="flex-shrink-0">
              <Badge variant="secondary" className="text-sm px-3 py-2 bg-white/20 text-white border-white/30">
                <Activity className="w-4 h-4 mr-2" />
                0 documents
              </Badge>
            </div>
          </div>
        </div>

        {/* Contenu de la page */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-light-gray-1 to-light-gray-2 border-b border-gray-200">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-600/10 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-orange-600" />
                  </div>
                  Mes Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Aucun document disponible</h3>
                  <p className="text-muted-foreground">
                    Vos documents apparaîtront ici une fois que vous en aurez ajouté.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-light-gray-1 to-light-gray-2 border-b border-gray-200">
                <CardTitle className="text-lg">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload document
                </Button>
                
                <Button variant="outline" className="w-full border-border hover:bg-green-pastel">
                  <Search className="w-4 h-4 mr-2" />
                  Rechercher
                </Button>
                
                <Button variant="outline" className="w-full border-border hover:bg-green-pastel">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrer
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage; 