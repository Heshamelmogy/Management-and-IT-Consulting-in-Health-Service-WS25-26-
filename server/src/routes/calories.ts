import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { dbGet } from '../database';

const router = express.Router();

// Calculate calories based on user goal
router.post('/calculate', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const user: any = await dbGet('SELECT * FROM users WHERE id = ?', [req.userId]);
    
    const { age, weight, height, gender, activity_level, goal } = req.body;
    const userAge = age || user.age;
    const userWeight = weight || user.weight;
    const userHeight = height || user.height;
    const userGender = gender || user.gender;
    const userActivity = activity_level || user.activity_level || 'moderate';
    const userGoal = goal || user.goal || 'maintain';

    if (!userAge || !userWeight || !userHeight || !userGender) {
      return res.status(400).json({ error: 'Age, weight, height, and gender are required' });
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number;
    if (userGender.toLowerCase() === 'male') {
      bmr = 10 * userWeight + 6.25 * userHeight - 5 * userAge + 5;
    } else {
      bmr = 10 * userWeight + 6.25 * userHeight - 5 * userAge - 161;
    }

    // Activity multipliers
    const activityMultipliers: { [key: string]: number } = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    const tdee = bmr * (activityMultipliers[userActivity.toLowerCase()] || 1.55);

    // Goal adjustments
    let targetCalories: number;
    const goalAdjustments: { [key: string]: number } = {
      lose: -500, // 1 lb per week
      maintain: 0,
      gain: 500 // 1 lb per week
    };

    targetCalories = tdee + (goalAdjustments[userGoal.toLowerCase()] || 0);

    // Calculate macronutrients (standard split)
    const proteinGrams = Math.round(userWeight * 2.2); // 1g per lb of body weight
    const proteinCalories = proteinGrams * 4;
    const remainingCalories = targetCalories - proteinCalories;
    const fatGrams = Math.round((targetCalories * 0.25) / 9); // 25% from fat
    const fatCalories = fatGrams * 9;
    const carbCalories = targetCalories - proteinCalories - fatCalories;
    const carbGrams = Math.round(carbCalories / 4);

    res.json({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      goal: userGoal,
      activityLevel: userActivity,
      macros: {
        protein: {
          grams: proteinGrams,
          calories: proteinCalories,
          percentage: Math.round((proteinCalories / targetCalories) * 100)
        },
        carbs: {
          grams: carbGrams,
          calories: carbCalories,
          percentage: Math.round((carbCalories / targetCalories) * 100)
        },
        fat: {
          grams: fatGrams,
          calories: fatCalories,
          percentage: Math.round((fatCalories / targetCalories) * 100)
        }
      }
    });
  } catch (error: any) {
    console.error('Calculate calories error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
