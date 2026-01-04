-- ============================================================================
-- REQUEST_3.sql - Somnia Data
-- ============================================================================
-- Objective: Retrieve all non-active recommendations for a given plan (plan id = 30)
-- ============================================================================

SELECT ip.*
FROM profiles p
JOIN interventionPlans ip ON p.profileId = ip.profileId
WHERE ip.status <> 'active' AND p.planId = 30;
