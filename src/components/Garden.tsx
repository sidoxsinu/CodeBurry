import React, { useState } from 'react';
import { TreePine, Droplets, Sparkles, Calendar, TrendingUp } from 'lucide-react';
import { Tree } from '../types';

interface GardenProps {
  trees: Tree[];
  waterDrops: number;
  onWaterTree: (treeId: string) => void;
  onPlantNewTree: () => void;
}

export default function Garden({ trees, waterDrops, onWaterTree, onPlantNewTree }: GardenProps) {
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);

  const getTreeStageIcon = (stage: Tree['growthStage'], size = 'h-8 w-8') => {
    const baseClass = `${size} transition-all duration-300`;
    switch (stage) {
      case 'seed':
        return <div className={`${baseClass} bg-brown-600 rounded-full`} />;
      case 'sprout':
        return <div className={`${baseClass} bg-green-300 rounded-t-full`} />;
      case 'sapling':
        return <TreePine className={`${baseClass} text-green-400`} />;
      case 'tree':
        return <TreePine className={`${baseClass} text-green-600`} />;
      case 'giant':
        return <TreePine className={`${baseClass} text-green-800`} />;
      default:
        return <TreePine className={`${baseClass} text-green-600`} />;
    }
  };

  const getStageProgress = (stage: Tree['growthStage']) => {
    const stages = ['seed', 'sprout', 'sapling', 'tree', 'giant'];
    return ((stages.indexOf(stage) + 1) / stages.length) * 100;
  };

  const getWaterCost = (stage: Tree['growthStage']) => {
    switch (stage) {
      case 'seed': return 10;
      case 'sprout': return 25;
      case 'sapling': return 50;
      case 'tree': return 100;
      case 'giant': return 0; // Fully grown
      default: return 10;
    }
  };

  const canWaterTree = (tree: Tree) => {
    return tree.growthStage !== 'giant' && waterDrops >= getWaterCost(tree.growthStage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Your Learning Forest
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Watch your skills grow into a magnificent forest. Each tree represents mastery 
            of a skill or completion of a learning journey.
          </p>
          
          {/* Water Drops Display */}
          <div className="inline-flex items-center space-x-2 bg-blue-100 px-6 py-3 rounded-full">
            <Droplets className="h-6 w-6 text-blue-600" />
            <span className="text-2xl font-bold text-blue-700">{waterDrops}</span>
            <span className="text-blue-600">water drops available</span>
          </div>
        </div>

        {/* Garden Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <TreePine className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">{trees.length}</div>
            <div className="text-gray-600">Trees Planted</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <Sparkles className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">
              {trees.filter(t => t.growthStage === 'giant').length}
            </div>
            <div className="text-gray-600">Fully Grown</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(trees.reduce((acc, tree) => acc + getStageProgress(tree.growthStage), 0) / trees.length || 0)}%
            </div>
            <div className="text-gray-600">Avg Progress</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">
              {trees.reduce((acc, tree) => acc + tree.waterDropsInvested, 0)}
            </div>
            <div className="text-gray-600">Total Investment</div>
          </div>
        </div>

        {/* Garden Grid */}
        {trees.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
            {trees.map((tree) => (
              <div
                key={tree.id}
                onClick={() => setSelectedTree(tree)}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer text-center"
              >
                <div className="mb-4 flex justify-center">
                  {getTreeStageIcon(tree.growthStage, 'h-16 w-16')}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{tree.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{tree.category}</p>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getStageProgress(tree.growthStage)}%` }}
                  />
                </div>
                
                {/* Water Button */}
                {tree.growthStage !== 'giant' ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onWaterTree(tree.id);
                    }}
                    disabled={!canWaterTree(tree)}
                    className={`flex items-center justify-center space-x-1 w-full py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      canWaterTree(tree)
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Droplets className="h-4 w-4" />
                    <span>{getWaterCost(tree.growthStage)}</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-center space-x-1 w-full py-2 px-3 bg-green-100 text-green-600 rounded-lg text-sm font-medium">
                    <Sparkles className="h-4 w-4" />
                    <span>Fully Grown!</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <TreePine className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your garden is waiting to bloom</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Complete challenges in the Learning Hub to plant your first tree and start growing your forest of knowledge.
            </p>
          </div>
        )}

        {/* Plant New Tree Button */}
        <div className="text-center">
          <button
            onClick={onPlantNewTree}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Plant New Tree
          </button>
        </div>

        {/* Tree Detail Modal */}
        {selectedTree && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full">
              <div className="text-center mb-6">
                {getTreeStageIcon(selectedTree.growthStage, 'h-24 w-24 mx-auto')}
                <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-2">{selectedTree.name}</h2>
                <p className="text-gray-600">{selectedTree.category}</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Growth Stage:</span>
                  <span className="font-semibold capitalize">{selectedTree.growthStage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Water Invested:</span>
                  <span className="font-semibold">{selectedTree.waterDropsInvested} drops</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Planted:</span>
                  <span className="font-semibold">{selectedTree.plantedAt.toLocaleDateString()}</span>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedTree(null)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}