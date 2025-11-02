import React, { useState, useEffect } from 'react';
import { Activity, AlertCircle, Apple, Coffee, Sparkles, TrendingUp, Calendar, Heart } from 'lucide-react';

function Dashboard({ user }) {
  const [symptom, setSymptom] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [healthGoal, setHealthGoal] = useState('');
  const [userProgress, setUserProgress] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(`progress_${user?.uid}`);
    if (saved) {
      setUserProgress(JSON.parse(saved));
    }
  }, [user]);

  const saveProgress = (newEntry) => {
    const updated = [newEntry, ...userProgress].slice(0, 10);
    setUserProgress(updated);
    localStorage.setItem(`progress_${user?.uid}`, JSON.stringify(updated));
  };

  const fetchRecommendations = async () => {
    setLoading(true);
    setError('');
    try {
      const APP_ID = '8c3e93c1';
      const APP_KEY = '6390292573410f1d0b501e228c8c6c77';
      const searchQuery = mapSymptomToFood(symptom || healthGoal);
      
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(searchQuery)}&app_id=${APP_ID}&app_key=${APP_KEY}&health=alcohol-free&diet=balanced&imageSize=REGULAR&random=true&field=label&field=image&field=calories&field=url&field=yield&field=ingredientLines&field=totalNutrients&field=healthLabels`
      ); 

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      
      if (data.hits && data.hits.length > 0) {
        const formattedRecommendations = data.hits.slice(0, 6).map(hit => ({
          name: hit.recipe.label,
          image: hit.recipe.image,
          calories: Math.round(hit.recipe.calories / hit.recipe.yield),
          url: hit.recipe.url,
          ingredients: hit.recipe.ingredientLines,
          nutrients: hit.recipe.totalNutrients,
          healthLabels: hit.recipe.healthLabels
        }));
        
        setRecommendations(formattedRecommendations);
        saveProgress({
          date: new Date().toISOString(),
          symptom: symptom || healthGoal,
          resultCount: formattedRecommendations.length
        });
      } else {
        setError('No recommendations found. Try a different symptom or goal.');
      }
    } catch (err) {
      setError('Unable to fetch recommendations. Please try again later.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const mapSymptomToFood = (input) => {
    const lowerInput = input.toLowerCase();
    const mappings = {
      'fatigue': 'iron rich foods spinach',
      'tired': 'energy boosting foods',
      'stress': 'calming foods magnesium',
      'anxiety': 'omega-3 salmon',
      'skin': 'vitamin c foods',
      'acne': 'antioxidant foods berries',
      'dry skin': 'healthy fats avocado',
      'hair': 'protein rich foods',
      'digestion': 'fiber rich foods',
      'bloating': 'probiotic foods',
      'immune': 'vitamin c immune',
      'cold': 'immune boosting soup',
      'energy': 'high protein meals',
      'weight loss': 'low calorie healthy meals',
      'muscle': 'high protein meals',
      'sleep': 'magnesium foods',
      'headache': 'hydrating foods',
      'inflammation': 'anti-inflammatory turmeric'
    };

    for (const [key, value] of Object.entries(mappings)) {
      if (lowerInput.includes(key)) {
        return value;
      }
    }

    return input || 'healthy balanced meals';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (symptom.trim() || healthGoal.trim()) {
      fetchRecommendations();
    }
  };

  const healthTips = [
    'Drink at least 8 glasses of water daily',
    'Include colorful vegetables in every meal',
    'Aim for 7-9 hours of quality sleep each night',
    'Regular physical activity enhances nutrient absorption',
    'Eat mindfully and avoid distractions during meals',
    'Incorporate healthy fats like avocados and nuts',
    'Limit processed foods and added sugars',
    'Practice portion control to maintain a healthy weight',
    'Include a source of protein in every meal'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.email?.split('@')[0] || 'User'}!
              </h1>
              <p className="text-gray-600">Search for food recommendations based on your symptoms or goals</p>
            </div>
            <div className="flex items-center space-x-2 text-primary-600">
              <Heart className="h-8 w-8" />
              <span className="text-2xl font-bold">{userProgress.length}</span>
              <span className="text-gray-600">Searches</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Activity className="h-6 w-6 mr-2 text-primary-600" />
                How are you feeling?
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Symptoms or Concerns
                  </label>
                  <input
                    type="text"
                    value={symptom}
                    onChange={(e) => setSymptom(e.target.value)}
                    placeholder="e.g., fatigue, stress, poor skin, low energy..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Health Goal (Optional)
                  </label>
                  <input
                    type="text"
                    value={healthGoal}
                    onChange={(e) => setHealthGoal(e.target.value)}
                    placeholder="e.g., boost immunity, improve digestion, increase energy..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || (!symptom.trim() && !healthGoal.trim())}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Getting Recommendations...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Get Personalized Recommendations
                    </>
                  )}
                </button>
              </form>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-sm text-red-600">{error}</span>
                </div>
              )}
            </div>

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Apple className="h-6 w-6 mr-2 text-primary-600" />
                  Your Personalized Recommendations
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                      <img 
                        src={rec.image} 
                        alt={rec.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{rec.name}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <Coffee className="h-4 w-4 mr-1" />
                          <span>{rec.calories} cal/serving</span>
                        </div>
                        <div className="mb-3">
                          <p className="text-xs text-gray-500 mb-1">Key Ingredients:</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {rec.ingredients.slice(0, 3).map((ing, i) => (
                              <li key={i} className="line-clamp-1">• {ing}</li>
                            ))}
                          </ul>
                        </div>
                        <a
                          href={rec.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg text-sm font-medium transition"
                        >
                          View Recipe
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Progress History */}
            {userProgress.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2 text-primary-600" />
                  Your Progress History
                </h2>
                <div className="space-y-3">
                  {userProgress.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{entry.symptom}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(entry.date).toLocaleDateString()} - {entry.resultCount} recommendations
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Daily Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-primary-600" />
                Daily Health Tips
              </h3>
              <div className="space-y-3">
{healthTips.map((tip, index) => (
                  <div key={index} className="p-3 bg-primary-50 rounded-lg">
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-primary-600 to-green-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Your Wellness Journey</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-primary-100 text-sm">Total Searches</p>
                  <p className="text-3xl font-bold">{userProgress.length}</p>
                </div>
                <div>
                  <p className="text-primary-100 text-sm">Current Recommendations</p>
                  <p className="text-3xl font-bold">{recommendations.length}</p>
                </div>
                <div className="pt-4 border-t border-primary-400">
                  <p className="text-sm text-primary-100">
                    Keep tracking your symptoms and health goals for better insights!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;